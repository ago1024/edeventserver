import path from "path";
import os from "os";
import fs from "fs";
import debug from 'debug';

const log = debug('edes:savefilediscovery:log');

export class SaveFileDiscoveryService {

	private _folder: string;

	constructor() {
		const homedir = os.homedir();
		const folder = path.resolve(homedir, 'Saved Games', 'Frontier Developments', 'Elite Dangerous');
		const stats = fs.statSync(folder);

		if (!stats.isDirectory())
			throw new Error(`Folder '${folder}' does not exist`);

		this._folder = folder;
		log(this._folder);
	}

	get folder(): string {
		return this._folder;
	}
}
