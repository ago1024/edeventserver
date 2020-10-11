import { Subject } from "rxjs";

export class JsonFileWatcher {
	private _subject: Subject<string>;

	constructor(private _filename: string) {
		this._subject = new Subject<string>();
	}

}
