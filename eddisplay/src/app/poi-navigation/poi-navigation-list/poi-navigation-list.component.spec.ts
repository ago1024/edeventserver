import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiNavigationListComponent } from './poi-navigation-list.component';

describe('PoiNavigationListComponent', () => {
	let component: PoiNavigationListComponent;
	let fixture: ComponentFixture<PoiNavigationListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PoiNavigationListComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PoiNavigationListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
