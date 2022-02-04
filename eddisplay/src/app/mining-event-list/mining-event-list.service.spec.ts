import { TestBed } from '@angular/core/testing';

import { MiningEventListService } from './mining-event-list.service';

describe('MiningEventListService', () => {
	let service: MiningEventListService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MiningEventListService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
