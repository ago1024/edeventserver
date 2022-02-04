import { TestBed } from '@angular/core/testing';

import { ChatViewerService } from './chat-viewer.service';

describe('ChatViewerService', () => {
	let service: ChatViewerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ChatViewerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
