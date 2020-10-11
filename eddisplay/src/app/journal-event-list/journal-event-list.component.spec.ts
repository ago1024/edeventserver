import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEventListComponent } from './journal-event-list.component';

describe('JournalEventListComponent', () => {
	let component: JournalEventListComponent;
	let fixture: ComponentFixture<JournalEventListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ JournalEventListComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JournalEventListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
