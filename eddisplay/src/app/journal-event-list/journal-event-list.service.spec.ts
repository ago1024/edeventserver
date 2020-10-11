import { TestBed } from '@angular/core/testing';

import { JournalEventListService } from './journal-event-list.service';

describe('JournalEventListService', () => {
	let service: JournalEventListService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(JournalEventListService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
