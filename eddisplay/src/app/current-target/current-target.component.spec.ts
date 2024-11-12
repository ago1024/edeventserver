import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTargetComponent } from './current-target.component';

describe('CurrentTargetComponent', () => {
	let component: CurrentTargetComponent;
	let fixture: ComponentFixture<CurrentTargetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CurrentTargetComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CurrentTargetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
