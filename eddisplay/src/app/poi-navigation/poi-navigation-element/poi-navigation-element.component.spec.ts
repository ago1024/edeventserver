import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistancePipe } from 'src/app/distance.pipe';
import { CurrentLocation, PointOfInterest } from '../poi-navigation.service';

import { PoiNavigationElementComponent } from './poi-navigation-element.component';

describe('PoiNavigationElementComponent', () => {
	let testHostComponent: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	const poi = {
		Name: 'Crashed drone',
		Latitude: -9.933245,
		Longitude: -50.169037,
		BodyName: 'Luchtaine A 2 a',
	};

	const location = {
		Latitude: -15.706686,
		Longitude: 76.740746,
		BodyName: 'Luchtaine A 2 a',
		PlanetRadius: 867536.4375,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		testHostComponent = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(testHostComponent.component).toBeTruthy();
	});

	it('should show the location', () => {
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('.poi-location').innerText)
			.toEqual('CRASHED DRONE · LUCHTAINE A 2 A (-9.933245, -50.169037)');
	});

	it('should calculate the status', () => {
		testHostComponent.current = location;
		fixture.detectChanges();
		expect(testHostComponent.component.status).toBeTruthy();
	});

	it('should show the status', () => {
		testHostComponent.current = location;
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('.poi-status').innerText).toEqual('Bearing 248 Distance 1.8Mm');
	});

	@Component({
		selector: 'app-host-component',
		template: `<app-poi-navigation-element [poi]="poi" [current]="current"></app-poi-navigation-element>`,
		imports: [PoiNavigationElementComponent],
	})
	class TestHostComponent {
		public poi: PointOfInterest = poi;
		public current: CurrentLocation;

		@ViewChild(PoiNavigationElementComponent)
		public component: PoiNavigationElementComponent;
	}

});
