import { Component, OnInit, inject } from '@angular/core';
import { JournalEvent } from '../interfaces';
import { MiningEventListService } from './mining-event-list.service';
import { MiningEventComponent } from '../mining-event/mining-event.component';

@Component({
	selector: 'app-mining-event-list',
	templateUrl: './mining-event-list.component.html',
	styleUrls: ['./mining-event-list.component.less'],
	standalone: true,
	imports: [MiningEventComponent],
})
export class MiningEventListComponent implements OnInit {

	miningEvents: JournalEvent[] = [];

	constructor() {
		const service = inject(MiningEventListService);

		this.miningEvents = service.miningEvents;
	}

	ngOnInit(): void {
	}

}
