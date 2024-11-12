import { Observable, ReplaySubject } from "rxjs";
import { JournalEvent } from "./events";
import { JournalService } from "./journal-service";

export class CommanderService {
	private _state: { [key:string]: JournalEvent } = {};

	constructor(private _journal: JournalService) {
		this._journal.journal.subscribe({
			next: (event: JournalEvent): void => {
				this.handleEvent(event);
			}
		});
	}

	handleEvent(event: JournalEvent): void {
		if (!event || !event.event)
			return;

		switch (event.event) {
			case "Commander":
			case "Materials":
			case "LoadGame":
			case "Rank":
			case "Progress":
			case "Reputation":
			case "EngineerProgress":
			case "Location":
			case "Missions":
			case "Statistics":
			case "Cargo":
			case "Docked":
			case "Loadout":
				this._state[event.event] = event;
				break;

			case "Undocked":
				delete this._state.Docked;
				break;
			case "Shutdown":
				this._state = {};
		}
	}

	events(): Observable<JournalEvent> {
		const subject = new ReplaySubject<JournalEvent>();
		for (const key in this._state) {
			subject.next(this._state[key]);
		}
		subject.complete();
		return subject;
	}
}