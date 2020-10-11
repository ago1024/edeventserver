import { TestBed } from '@angular/core/testing';

import { PoiNavigationService } from './poi-navigation.service';

describe('PoiNavigationService', () => {
	let service: PoiNavigationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PoiNavigationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
