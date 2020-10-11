import { Observable, PartialObserver, Subject, Subscribable, Unsubscribable } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { service as saveFileService } from "../savefile-discovery-service";
import { JournalEvent } from "./events";

import fs = require("fs");
import path = require("path");
import readline = require("readline");
import debug = require('debug');

const log = debug('edes:journal:log');

interface JournalFileEntry {
	name: string;
	ts1: number;
	ts2: number;
}

interface FileChangeEvent {
	name: string;
	path: string;
}

const re = /Journal\.([0-9]*)\.([0-9]*)\.log/;

function compareJournalFileEntry(a: JournalFileEntry, b: JournalFileEntry) {
	return (a.ts1 - b.ts1) || (a.ts1 - b.ts2) || 0;
}

class JournalReader {
	private _lastsize = 0;
	private _subject: Subject<JournalEvent>;

	constructor(private _current: JournalFileEntry) {
		this._subject = new Subject<JournalEvent>();
		const stat = fs.statSync(this._current.name);
		this.read();
		this._lastsize = stat.size;
	
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

	get observable$(): Observable<JournalEvent> {
		return this._subject;
	}

	get current(): JournalFileEntry {
		return this._current;
	}

	change() {
		if (!this._current)
			return;

		const stat = fs.statSync(this._current.name);
		if (stat && this._lastsize != stat.size) {
			this.read();
			this._lastsize = stat.size;
		}
	}

	read() {
		const stream = fs.createReadStream(this._current.name, {
			start: this._lastsize,
			
		});

		const rl = readline.createInterface({
			input: stream,
			crlfDelay: Infinity,
		});

		rl.on("line", (line) => {
			const event = JSON.parse(line) as JournalEvent;
			this._subject.next(event);
		});
	}

	close(): void {
		fs.unwatchFile(this._current.name);
		this._current = undefined;
	}
}

export class JournalService {
	private _watcher: fs.FSWatcher;
	private _subject: Subject<JournalEvent>;
	private _fileUpdates: Subject<FileChangeEvent>;
	private _current: JournalReader;
	private _folder: string;

	constructor() {
		this._subject = new Subject<JournalEvent>();
		this._folder = saveFileService.folder;
		this._fileUpdates = new Subject<FileChangeEvent>();

		const latestJournal = this.findLatestJournalFile();
		if (latestJournal) {
			this.open(latestJournal);
		}

		this._watcher = fs.watch(this._folder, { persistent: true }, (eventType, filename) => {
			switch (eventType) {
				case "rename":
					return this.renameEvent(filename);
				case "change":
					return this.changeEvent(filename);
				default:
					log.log(`Unknown event type ${eventType}`);
			}
		});

		this._fileUpdates
			.pipe(
				filter(event => event.name === "Status.json"),
				map(event => this.readEvent(event.path)),
				filter(event => !!event))
			.subscribe({
				next: (e) => this._subject.next(e),
				error: (e) => this._subject.error(e),
			});
	}

	private readEvent(path: string): JournalEvent {
		const buffer = fs.readFileSync(path);
		if (buffer.length === 0)
			return undefined;
		const event = JSON.parse(buffer.toString()) as JournalEvent;
		return event;
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

	private findLatestJournalFile(): JournalFileEntry {

		const dir = fs.opendirSync(this._folder)
		const entries: JournalFileEntry[] = [];
		let dirent: fs.Dirent;
		while ((dirent = dir.readSync())) {
			if (!dirent.isFile())
				continue;

			const entry = this.parseJournalFileEntry(dirent.name, this._folder);
			if (!entry)
				continue;
			entries.push(entry);
		}
		dir.closeSync();

		entries.sort(compareJournalFileEntry);
		return entries.pop();
	}

	public close(): void {
		if (this._current) {
			this._current.close();
			this._current = undefined;
		}
		this._watcher.close();
		this._subject.complete();
	}

	private open(journal: JournalFileEntry): void {
		if (this._current) {
			log(`close ${this._current.current.name}`);
			this._current.close();
		}
		log(`open ${journal.name}`);
		this._current = new JournalReader(journal);
		this._current.observable$
			.pipe(map(event => this.handleEvents(event)), filter(event => !!event))
			.subscribe({
				next: (e) => this._subject.next(e),
				error: (e) => this._subject.error(e),
			});
	}

	private handleEvents(event: JournalEvent): JournalEvent {
		switch (event.event) {
			case "NavRoute":
				return this.readEvent(path.resolve(this._folder, "NavRoute.json"));
			default:
				return event;
		}
	}

	private renameEvent(filename: string): void {
		log(`renameEvent ${filename}`);
		const entry = this.parseJournalFileEntry(filename, this._folder);
		if (!entry)
			return;

		const current = this._current?.current;
		if (current && compareJournalFileEntry(current, entry) > 0)
			return;

		const stat = fs.statSync(entry.name);
		if (!stat.isFile())
			return;
		
		this.open(entry);
	}

	private changeEvent(filename: string): void {
		log(`changeEvent ${filename}`);
		this._fileUpdates.next({ name: filename, path: path.resolve(this._folder, filename) });
	}

	get journal(): Observable<JournalEvent> {
		return this._subject;
	}

}