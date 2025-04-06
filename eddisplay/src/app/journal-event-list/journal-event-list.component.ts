import { Component, inject } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JournalEventListService } from './journal-event-list.service';
import { JournalEventComponent } from '../journal-event/journal-event.component';

@Component({
	selector: 'app-journal-event-list',
	templateUrl: './journal-event-list.component.html',
	styleUrls: ['./journal-event-list.component.less'],
	imports: [JournalEventComponent]
})
export class JournalEventListComponent {

	journalEvents: JournalEvent[] = [];

	constructor() {
		const service = inject(JournalEventListService);

		this.journalEvents = service.journalEvents;
	}

}
