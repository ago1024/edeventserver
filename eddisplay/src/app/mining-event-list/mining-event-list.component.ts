import { Component, inject, signal } from '@angular/core';
import { MiningEventComponent } from '../mining-event/mining-event.component';
import { MiningEventListService, ProspectedAsteroidEvent } from './mining-event-list.service';
import { AsyncPipe, PercentPipe } from '@angular/common';
import { filter, map } from 'rxjs/operators';
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

	readonly ratios$ = this.service.motherlodeCounter$.pipe(
		map(counter => {
			const total = Object.values(counter).reduce((sum, value) => sum += value, 0);
			if (total === 0) {
				return [];
			}
			function* generator() {
				for (const [material, count] of Object.entries(counter)) {
					yield { material, count, ratio: count / total };
				}
			}
			return Array.from(generator());
		}),
	)

	private readonly subscription = this.service.prospected$.pipe(
		takeUntilDestroyed(),
		filter((event) => event.MotherlodeMaterial && this.soundEnabled()),
	).subscribe(event => this.announceMotherlode(event));

	protected announceMotherlode(event: ProspectedAsteroidEvent): void {
		if (!speechSynthesis) {
			return;
		}

		try {
			const utterance = new SpeechSynthesisUtterance(event.MotherlodeMaterial);
			utterance.lang = 'en';
			speechSynthesis.speak(utterance);
		} catch (error) {
			console.error(error);
		}
	}

}
