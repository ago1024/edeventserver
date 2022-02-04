import { Component, Input, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';

@Component({
	selector: 'app-mining-event',
	templateUrl: './mining-event.component.html',
	styleUrls: ['./mining-event.component.less'],
})
export class MiningEventComponent implements OnInit {

	@Input()
	miningEvent: JournalEvent;

	constructor() { }

	ngOnInit(): void {
	}

}
