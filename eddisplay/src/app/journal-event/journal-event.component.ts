import { Component, Input } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-journal-event',
	templateUrl: './journal-event.component.html',
	styleUrls: ['./journal-event.component.less'],
	imports: [JsonPipe]
})
export class JournalEventComponent {

	@Input()
	journalEvent: JournalEvent;

	constructor() { }

}
