import { Component, inject } from '@angular/core';
import { MiningEventComponent } from '../mining-event/mining-event.component';
import { MiningEventListService } from './mining-event-list.service';
import { AsyncPipe, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
	selector: 'app-mining-event-list',
	templateUrl: './mining-event-list.component.html',
	styleUrls: ['./mining-event-list.component.less'],
	standalone: true,
	imports: [
		AsyncPipe,
		DecimalPipe,
		PercentPipe,
		MiningEventComponent
	],
})
export class MiningEventListComponent {

	readonly service = inject(MiningEventListService);
	readonly miningEvents = this.service.miningEvents;

}
