import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEntryComponent } from './chat-entry.component';

describe('ChatEntryComponent', () => {
	let component: ChatEntryComponent;
	let fixture: ComponentFixture<ChatEntryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ChatEntryComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatEntryComponent);
		component = fixture.componentInstance;
		component.chatEvent = { event: 'ReceiveText', timestamp: new Date().toISOString() };
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
