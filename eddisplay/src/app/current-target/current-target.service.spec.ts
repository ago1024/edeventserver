import { TestBed } from '@angular/core/testing';

import { CurrentTargetService } from './current-target.service';

describe('CurrentTargetService', () => {
	let service: CurrentTargetService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CurrentTargetService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
