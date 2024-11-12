import { Injectable, inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { ShipTargetedEvent } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class CurrentTargetService {
	private eventService = inject(EdEventService);


	target: ShipTargetedEvent;

	constructor() {
		this.eventService.events$
			.pipe(filter(event => event.event === 'ShipTargeted'))
			.subscribe(event => this.next(event as ShipTargetedEvent));
	}

	private next(event: ShipTargetedEvent) {
		if (event.TargetLocked) {
			this.target = event;
		} else {
			this.target = undefined;
		}
	}

}
