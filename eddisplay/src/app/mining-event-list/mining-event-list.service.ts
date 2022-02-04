import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class MiningEventListService {

	miningEvents: JournalEvent[] = [];

	constructor(private edEventService: EdEventService) {
		this.edEventService.events$
			.pipe(
				filter(event => {
					switch (event.event) {
						case 'ProspectedAsteroid':
						case 'Cargo':
							return true;
						default:
							return false;
					}
				})
			)
			.subscribe((event: JournalEvent) => this.next(event));
	}

	private next(event: JournalEvent): void {
		this.miningEvents.unshift(event);
		while (this.miningEvents.length > 10) {
			this.miningEvents.pop();
		}
	}
}
