import { Component, Input } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-chat-entry',
	templateUrl: './chat-entry.component.html',
	styleUrls: ['./chat-entry.component.less'],
	imports: [JsonPipe]
})
export class ChatEntryComponent {

	@Input()
	chatEvent: JournalEvent;

}
