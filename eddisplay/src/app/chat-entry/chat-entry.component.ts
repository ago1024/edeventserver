import { Component, Input, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';

@Component({
	selector: 'app-chat-entry',
	templateUrl: './chat-entry.component.html',
	styleUrls: ['./chat-entry.component.less']
})
export class ChatEntryComponent implements OnInit {

	@Input()
	chatEvent: JournalEvent;

	constructor() { }

	ngOnInit(): void {
	}

}
