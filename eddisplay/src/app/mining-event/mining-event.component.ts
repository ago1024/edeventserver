import { Component, Input } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-mining-event',
	templateUrl: './mining-event.component.html',
	styleUrls: ['./mining-event.component.less'],
	imports: [JsonPipe],
})
export class MiningEventComponent {

	@Input()
	miningEvent: JournalEvent;

}
