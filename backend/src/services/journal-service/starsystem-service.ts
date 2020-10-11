import { Observable, ReplaySubject } from "rxjs";
import { JournalEvent, StarSystemEvent } from "./events";
import { JournalService } from "./journal-service";

export class StarSystemService {
	private _state: { [key:string]: JournalEvent } = {};
	private _events: JournalEvent[] = [];
	private _systemaddress: number;

	constructor(private _journal: JournalService) {
		this._journal.journal.subscribe({
			next: (event: JournalEvent): void => {
				this.handleEvent(event);
			}
		});
	}

	clear(): void {
		this._state = {};
		this._events = [];
	}

	handleEvent(event: JournalEvent): void {
		if (!event || !event.event)
			return;

		switch (event.event) {
			case "Location":
			case "FSDJump":
				this.clear();
				this._systemaddress = (event as StarSystemEvent).SystemAddress;
				this._state[event.event] = event;
				break;
			case "Docked":
			case "FSSAllBodiesFound":
			case "FSSDiscoveryScan":
				if ((event as StarSystemEvent).SystemAddress !== this._systemaddress)
					return;
				this._state[event.event] = event;
				break;
			case "Undocked":
				delete this._state.Docked;
				break;
			case "FSSSignalDiscovered":
			case "SAASignalsFound":
			case "Scan":
				if ((event as StarSystemEvent).SystemAddress !== this._systemaddress)
					return;
				this._events.push(event);
				break;
			case "Shutdown":
				this.clear();
		}
	}

	events(): Observable<JournalEvent> {
		const subject = new ReplaySubject<JournalEvent>();
		for (const key in this._state) {
			subject.next(this._state[key]);
		}
		for (const event of this._events) {
			subject.next(event);
		}
		subject.complete();
		return subject;
	}
}