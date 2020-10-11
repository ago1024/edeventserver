import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoiNavigationService } from '../poi-navigation.service';

import { PoiNavigationListComponent } from './poi-navigation-list.component';

describe('PoiNavigationListComponent', () => {
	let service: PoiNavigationService;
	let component: PoiNavigationListComponent;
	let fixture: ComponentFixture<PoiNavigationListComponent>;

	const poi = {
		Name: 'Crashed drone',
		Latitude: -9.933245,
		Longitude: -50.169037,
		BodyName: 'Luchtaine A 2 a',
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PoiNavigationListComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		service = TestBed.inject(PoiNavigationService);
		fixture = TestBed.createComponent(PoiNavigationListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show pois', () => {
		service.pois = [{...poi}, {...poi}];
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
	});

	it('should remove a poi', () => {
		service.pois = [{...poi}, {...poi}];
		fixture.detectChanges();
		fixture.nativeElement.querySelector('button').click();
		expect(service.pois.length).toBe(1);
	});

});
