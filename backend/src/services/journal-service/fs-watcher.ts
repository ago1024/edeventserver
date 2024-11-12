import { Observable, Subscriber } from "rxjs";

import fs = require("fs");
import path = require("path");
import debug = require('debug');

const log = debug('edes:journal:log');

interface FileChangeEvent {
	type: 'rename' | 'change';
	name: string;
	path: string;
}

class FsWatcherObservable extends Observable<FileChangeEvent> {

	constructor(private _folder: string) {
		super(subscriber => {
			const watcher = fs.watch(this._folder, { persistent: true }, (eventType, filename) => {
				switch (eventType) {
					case "rename":
						return this.renameEvent(subscriber, filename);
					case "change":
						return this.changeEvent(subscriber, filename);
					default:
						log.log(`Unknown event type ${eventType}`);
				}
			});
			return () => {
				watcher.close();
				subscriber.complete();
			}
		});
	}

	private renameEvent(subscriber: Subscriber<FileChangeEvent>, filename: string): void {
		log(`renameEvent ${filename}`);
		subscriber.next({ type: 'rename', name: filename, path: path.resolve(this._folder, filename) });
	}

	private changeEvent(subscriber: Subscriber<FileChangeEvent>, filename: string): void {
		log(`changeEvent ${filename}`);
		subscriber.next({ type: 'change', name: filename, path: path.resolve(this._folder, filename) });
	}
}

export class FsWatcherService {

	constructor(private _folder: string) {
	}

	get changes$(): Observable<FileChangeEvent> {
		return new FsWatcherObservable(this._folder);
	}

}