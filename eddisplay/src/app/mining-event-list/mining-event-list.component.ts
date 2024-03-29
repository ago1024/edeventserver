import { Component, OnInit } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { MiningEventListService } from './mining-event-list.service';

@Component({
	selector: 'app-mining-event-list',
	templateUrl: './mining-event-list.component.html',
	styleUrls: ['./mining-event-list.component.less'],
})
export class MiningEventListComponent implements OnInit {

	miningEvents: JournalEvent[] = [];

	constructor(service: MiningEventListService) {
		this.miningEvents = service.miningEvents;
	}

	ngOnInit(): void {
	}

}
