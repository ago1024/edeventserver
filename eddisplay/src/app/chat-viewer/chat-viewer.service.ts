import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class ChatViewerService {

	chatEvents: JournalEvent[] = [];

	constructor(private edEventService: EdEventService) {
		this.edEventService.events$.pipe(
			filter(event => event.event === 'ReceiveText')
		).subscribe((event: JournalEvent) => this.next(event));
	}

	private next(event: JournalEvent): void {
		this.chatEvents.unshift(event);
		while (this.chatEvents.length > 20) {
			this.chatEvents.pop();
		}
	}
}
