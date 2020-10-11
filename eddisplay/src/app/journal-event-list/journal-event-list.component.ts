import { Component, OnInit } from '@angular/core';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';
import { JournalEventListService } from './journal-event-list.service';

@Component({
	selector: 'app-journal-event-list',
	templateUrl: './journal-event-list.component.html',
	styleUrls: ['./journal-event-list.component.less']
})
export class JournalEventListComponent implements OnInit {

	journalEvents: JournalEvent[] = [];

	constructor(service: JournalEventListService) {
		this.journalEvents = service.journalEvents;
	}

	ngOnInit(): void {
	}

}
