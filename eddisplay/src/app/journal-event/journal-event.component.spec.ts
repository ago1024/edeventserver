import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEventComponent } from './journal-event.component';

describe('JournalEventComponent', () => {
	let component: JournalEventComponent;
	let fixture: ComponentFixture<JournalEventComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ JournalEventComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JournalEventComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
