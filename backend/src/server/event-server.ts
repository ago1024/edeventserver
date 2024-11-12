import { JournalEvent } from "../services/journal-service/events";
import { JournalService } from "../services/journal-service/journal-service";

import WebSocket = require("ws");
import { CommanderService } from "../services/journal-service/commander-service";
import { concat, NextObserver } from "rxjs";

import { StarSystemService } from "../services/journal-service/starsystem-service";

class EventClient implements NextObserver<JournalEvent> {
	constructor(private ws: WebSocket) {
	}

	next(event: JournalEvent): void {
		try {
			this.ws.send(JSON.stringify(event));
		} catch (error) {
			console.error(error);
		}
	}

	complete(): void {
		this.ws.close();
	}

	error(error: Error): void {
		this.ws.send(JSON.stringify(error));
		this.ws.close();
	}
}

export class EventServer {
	private _wss: WebSocket.Server;
	private _journal: JournalService;
	private _commander: CommanderService;
	private _starsystem: StarSystemService;
	

	constructor(options?: WebSocket.ServerOptions) {
		this._journal = new JournalService();
		this._commander = new CommanderService(this._journal);
		this._starsystem = new StarSystemService(this._journal);

		this._wss = new WebSocket.Server(options);
		this._wss.on('connection', ws => {
			this.connect(ws);
		});

		this._journal.journal.subscribe({
			next: (event: JournalEvent) => {
				//console.log(event);
			},
			error: (error: Error) => {
				console.error(error);
			}
		});
	}

	private connect(ws: WebSocket) {
		ws.on('message', (message) => {
			console.log(`received: ${message}`);
		});

		const client = new EventClient(ws);

		const subscription = concat(this._commander.events(), this._starsystem.events(), this._journal.journal).subscribe(client);

		ws.on("close", () => {
			subscription.unsubscribe();
		});
	}
}