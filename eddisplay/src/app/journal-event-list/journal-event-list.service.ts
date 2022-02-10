import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class JournalEventListService {

	journalEvents: JournalEvent[] = [];

	constructor(private edEventService: EdEventService) {
		this.edEventService.events$
			.pipe(filter(event => event.event !== 'Status'))
			.subscribe((event: JournalEvent) => this.next(event));
	}

	private next(event: JournalEvent): void {
		this.journalEvents.unshift(event);
		while (this.journalEvents.length > 10) {
			this.journalEvents.pop();
		}
	}
}
