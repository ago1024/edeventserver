import { TestBed } from '@angular/core/testing';

import { PowerplayService } from './powerplay.service';

describe('PowerplayService', () => {
	let service: PowerplayService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PowerplayService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
