import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningEventListComponent } from './mining-event-list.component';

describe('MiningEventListComponent', () => {
	let component: MiningEventListComponent;
	let fixture: ComponentFixture<MiningEventListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MiningEventListComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MiningEventListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
