import { Component, inject, signal } from '@angular/core';
import { MiningEventComponent } from '../mining-event/mining-event.component';
import { MiningEventListService } from './mining-event-list.service';
import { AsyncPipe, PercentPipe } from '@angular/common';
import { filter, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-mining-event-list',
	templateUrl: './mining-event-list.component.html',
	styleUrls: ['./mining-event-list.component.less'],
	imports: [
		AsyncPipe,
		PercentPipe,
		MiningEventComponent
	],
})
export class MiningEventListComponent {

	readonly service = inject(MiningEventListService);
	readonly miningEvents = this.service.miningEvents;
	readonly soundEnabled = signal(false);

	private readonly subscription = this.service.prospected$.pipe(
		takeUntilDestroyed(),
		filter(() => this.soundEnabled()),
		filter(() => !!speechSynthesis),
		filter((event) => !!event.MotherlodeMaterial),
		tap(event => {
			try {
				const utterance = new SpeechSynthesisUtterance(event.MotherlodeMaterial);
				utterance.lang = 'en';
				speechSynthesis.speak(utterance);
			} catch (error) {
				console.error(error);
			}
		}),
	).subscribe();

}
