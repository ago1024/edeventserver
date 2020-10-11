import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiNavigationComponent } from './poi-navigation.component';

describe('PoiNavigationComponent', () => {
	let component: PoiNavigationComponent;
	let fixture: ComponentFixture<PoiNavigationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PoiNavigationComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PoiNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
