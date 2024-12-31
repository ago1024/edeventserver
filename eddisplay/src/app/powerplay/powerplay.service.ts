import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, shareReplay } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';

export interface PowerplayEvent extends JournalEvent {
	event: 'Powerplay',
	Power: string;
	Rank: number;
	Merits: number;
	TimePledged: number;
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

	private readonly subscription = this.status$.subscribe();

}
