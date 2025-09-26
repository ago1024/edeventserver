import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, shareReplay, window, switchMap, scan, map } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';

interface Rank {
	Power: string;
	Rank: number;
}

export interface PowerplayEvent extends JournalEvent, Rank {
	event: 'Powerplay',
	Merits: number;
	TimePledged: number;
}

export interface PowerplayRank extends JournalEvent, Rank {
	event: 'PowerplayRank',
}

export interface PowerplayMerits extends JournalEvent {
	event: 'PowerplayMerits';
	Power: string;
	MeritsGained: number;
	TotalMerits: number;
}

@Injectable({
	providedIn: 'root'
})
export class PowerplayService {

	private readonly eventService = inject(EdEventService);
	public readonly status$ = this.eventService.events$.pipe(
		takeUntilDestroyed(),
		filter((event): event is PowerplayEvent => event?.event === 'Powerplay'),
		shareReplay({ refCount: false, bufferSize: 10 }),
	);

	public readonly merits$ = this.eventService.events$.pipe(
		takeUntilDestroyed(),
		filter((event): event is PowerplayMerits => event?.event === 'PowerplayMerits'),
		window(this.status$),
		switchMap(window$ => window$.pipe(
			scan((acc, value) => {
				acc.push(value);
				return acc.slice(-10);
			}, [] as PowerplayMerits[]),
			map(arr => [...arr].reverse()),
		)),


		shareReplay({ refCount: false, bufferSize: 10 }),
	);

	constructor() {
		this.status$.subscribe();
		this.merits$.subscribe();
	}

}
