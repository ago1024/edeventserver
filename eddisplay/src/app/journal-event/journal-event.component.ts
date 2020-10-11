import { Component, Input, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';

@Component({
	selector: 'app-journal-event',
	templateUrl: './journal-event.component.html',
	styleUrls: ['./journal-event.component.less']
})
export class JournalEventComponent implements OnInit {

	@Input()
	journalEvent: JournalEvent;

	constructor() { }

	ngOnInit(): void {
	}

}
