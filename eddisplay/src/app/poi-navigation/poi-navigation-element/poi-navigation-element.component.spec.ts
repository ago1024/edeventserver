import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiNavigationElementComponent } from './poi-navigation-element.component';

describe('PoiNavigationElementComponent', () => {
	let component: PoiNavigationElementComponent;
	let fixture: ComponentFixture<PoiNavigationElementComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PoiNavigationElementComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PoiNavigationElementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
