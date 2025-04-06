import { Component, Input, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-journal-event',
	templateUrl: './journal-event.component.html',
	styleUrls: ['./journal-event.component.less'],
	imports: [JsonPipe]
})
export class JournalEventComponent implements OnInit {

	@Input()
	journalEvent: JournalEvent;

	constructor() { }

	ngOnInit(): void {
	}

}
