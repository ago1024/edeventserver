import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from './config.service';
import { JournalEvent } from './interfaces';

@Injectable({
	providedIn: 'root'
})
export class EdEventService {
	private subject$: Subject<JournalEvent>;
	private websocket: WebSocket;

	constructor(private configService: ConfigService) {
		this.subject$ = new Subject<JournalEvent>();
		this.configService.serverEndpoint$.subscribe((endpoint) => {
			this.connect(endpoint);
		});
	}

	private connect(endpoint: string) {
		console.log(`connect ${endpoint}`)

		this.closeWebsocket();

		this.websocket = new WebSocket(endpoint);
		this.websocket.onmessage = (message: MessageEvent) => this.handleMessage(message);
	}

	private handleMessage(message: MessageEvent): void {
		try {
			const event = JSON.parse(message.data) as JournalEvent;
			console.log(event);
			this.subject$.next(event);
		} catch (error) {
			console.error(error);
		}
	}

	private closeWebsocket() {
		if (this.websocket) {
			this.websocket.close();
			this.websocket = undefined;
		}
	}

	public close() {
		this.closeWebsocket();
		this.subject$.complete();
	}

	get events$(): Observable<JournalEvent> {
		return this.subject$;
	}
}
