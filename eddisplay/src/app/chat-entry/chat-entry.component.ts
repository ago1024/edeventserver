import { Component, Input, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-chat-entry',
	templateUrl: './chat-entry.component.html',
	styleUrls: ['./chat-entry.component.less'],
	imports: [JsonPipe]
})
export class ChatEntryComponent implements OnInit {

	@Input()
	chatEvent: JournalEvent;

	constructor() { }

	ngOnInit(): void {
	}

}
