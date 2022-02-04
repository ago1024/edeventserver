import { concat, from, merge, Observable, of, Subscriber } from "rxjs";
import { distinctUntilKeyChanged, filter, map, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';
import { service as saveFileService } from "../savefile-discovery-service";
import { JournalEvent } from "./events";
import { FsWatcherService } from "./fs-watcher";

import fs = require("fs");
import path = require("path");
import readline = require("readline");
import debug = require('debug');

const log = debug('edes:journal:log');

interface JournalFileEntry {
	name: string;
	ts1: number;
	ts2: number;
	latest?: boolean;
}

const re = /Journal\.([0-9]*)\.([0-9]*)\.log/;

function compareJournalFileEntry(a: JournalFileEntry, b: JournalFileEntry) {
	return (a.ts1 - b.ts1) || (a.ts1 - b.ts2) || 0;
}

export class JournalEventReader {
	private _lastsize = 0;

	private constructor(private _current: JournalFileEntry, private _watch: boolean, private _subscriber: Subscriber<JournalEvent>) {
		const stat = fs.statSync(this._current.name);
		this.read();
		this._lastsize = stat.size;

		if (!_watch) {
			return;
		}
	
		// using watchfile here because Windows does not report any changes for open files. Calling
		// stat() on the file will update the file size in Windows and trigger the watcher. Since
		// we would need to call stat() periodicly anyway we can use watchfile, which does this
		// to monitor the file.
		fs.watchFile(_current.name, { persistent: true, interval: 500 }, (current, previous) => {
			if (current.mtime != previous.mtime) {
				this.change();
			}
		});
	}

	static create(current: JournalFileEntry, watch?: boolean): Observable<JournalEvent> {
		return new Observable<JournalEvent>(subscriber => {
			const reader = new JournalEventReader(current, watch, subscriber);
			return () => {
				reader.close();
			}
		});
	}

	change(): void {
		if (!this._current)
			return;

		const stat = fs.statSync(this._current.name);
		if (stat && this._lastsize != stat.size) {
			this.read();
			this._lastsize = stat.size;
		}
	}

	read(): void {
		const stream = fs.createReadStream(this._current.name, {
			start: this._lastsize,
		});

		const rl = readline.createInterface({
			input: stream,
			crlfDelay: Infinity,
		});

		rl.on("line", (line) => {
			const event = JSON.parse(line) as JournalEvent;
			this._subscriber.next(event);
			if (event.event === 'Shutdown') {
				log.extend('JournalEventReader')('shutdown');
				this.close();
			}
		});

		stream.on("pause", () => {
			log.extend('JournalEventReader')('pause');
			if (!this._watch) {
				this.close();
			}
		});
	}

	close(): void {
		log.extend('JournalEventReader')('close');
		fs.unwatchFile(this._current.name);
		this._subscriber.complete();
	}
}

export class JournalFileObservable extends Observable<JournalFileEntry> {

	constructor(private _folder: string, watch: boolean, includeHistoric?: boolean) {
		super(subscriber => {
			const fsWatcher = new FsWatcherService(this._folder);

			let newestJournalFile: JournalFileEntry = undefined;

			const pipes = [
				from(this.findJournalFiles()).pipe(
					mergeMap(journalFiles => {
						newestJournalFile = journalFiles.pop();
						const historicFiles = includeHistoric ? journalFiles : [];
						return of(...historicFiles, {...newestJournalFile, latest: true});
					}),
				),
				fsWatcher.changes$.pipe(
					filter(change => change.type === 'rename'),
					map(change => this.parseJournalFileEntry(change.name, this._folder)),
					filter(journalFile => !!journalFile),
					filter(journalFile => this.isNewerThan(newestJournalFile, journalFile)),
					tap(journalFile => newestJournalFile = journalFile),
					map(journalFile => ({...journalFile, latest: true}))
				),
			];

			if (!watch) {
				pipes.pop();
			}

			const subscription = concat(...pipes).pipe(
				distinctUntilKeyChanged('name'),
			).subscribe(subscriber);
			return subscription;
		});
	}

	private isNewerThan(newestJournalFile: JournalFileEntry, entry: JournalFileEntry) {
		if (!entry)
			return false;

		if (newestJournalFile && compareJournalFileEntry(newestJournalFile, entry) >= 0)
			return false;

		const stat = fs.statSync(entry.name);
		if (!stat.isFile())
			return false;

		return true;
	}

	private parseJournalFileEntry(name: string, folder: string): JournalFileEntry {
		const match = name.match(re);
		if (!match)
			return undefined;

		return {
			name: path.resolve(folder, name),
			ts1: parseInt(match[1]),
			ts2: parseInt(match[2]),
		};
	}

	private async findJournalFiles(): Promise<JournalFileEntry[]> {
		const dir = await fs.promises.opendir(this._folder)
		const entries: JournalFileEntry[] = [];
		for await (const dirent of dir) {
			if (!dirent.isFile())
				continue;

			const entry = this.parseJournalFileEntry(dirent.name, this._folder);
			if (!entry)
				continue;
			entries.push(entry);
		}

		entries.sort(compareJournalFileEntry);
		return entries;
	}
}


export class JournalService {
	private _folder: string;
	private _journal: Observable<JournalEvent>;

	constructor() {
		this._folder = saveFileService.folder;

		const journalObservable = new JournalFileObservable(saveFileService.folder, true).pipe(
			switchMap(entry => JournalEventReader.create(entry, entry.latest)),
			map(event => {
				switch (event.event) {
					case "NavRoute":
						return this.readEvent(path.resolve(this._folder, "NavRoute.json"));
					case "ModuleInfo":
						return this.readEvent(path.resolve(this._folder, "ModulesInfo.json"));
					case "Market":
						return this.readEvent(path.resolve(this._folder, "Market.json"));
					default:
						return event;
				}
			}),
		);

		const statusObservable = new FsWatcherService(saveFileService.folder).changes$.pipe(
			filter(event => event.type === 'change' && event.name === "Status.json"),
			map(event => this.readEvent(event.path)),
			filter(event => !!event),
		);

		this._journal = merge(journalObservable, statusObservable).pipe(
			shareReplay({refCount: true}),
		);

	}

	private readEvent(path: string): JournalEvent {
		const buffer = fs.readFileSync(path);
		if (buffer.length === 0)
			return undefined;
		const event = JSON.parse(buffer.toString()) as JournalEvent;
		return event;
	}

	get journal(): Observable<JournalEvent> {
		return this._journal;
	}
}