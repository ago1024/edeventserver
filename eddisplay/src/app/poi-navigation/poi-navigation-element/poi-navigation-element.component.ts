import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { NavigationStatus, PoiNavigationService, PointOfInterest, Location, CurrentLocation } from '../poi-navigation.service';

@Component({
	selector: 'app-poi-navigation-element',
	templateUrl: './poi-navigation-element.component.html',
	styleUrls: ['./poi-navigation-element.component.less']
})
export class PoiNavigationElementComponent implements OnInit, OnChanges {
	private service = inject(PoiNavigationService);


	@Input()
	poi: PointOfInterest;

	@Input()
	current: CurrentLocation;

	status: NavigationStatus;

	ngOnInit(): void {
	}

	ngOnChanges() {
		this.status = this.service.calculateNavigationStatus(this.poi, this.current);
	}

}
