import { Component, Input, OnChanges, inject } from '@angular/core';
import { NavigationStatus, PoiNavigationService, PointOfInterest, CurrentLocation } from '../poi-navigation.service';
import { DecimalPipe } from '@angular/common';
import { DistancePipe } from '../../distance.pipe';

@Component({
	selector: 'app-poi-navigation-element',
	templateUrl: './poi-navigation-element.component.html',
	styleUrls: ['./poi-navigation-element.component.less'],
	imports: [DecimalPipe, DistancePipe]
})
export class PoiNavigationElementComponent implements OnChanges {
	private service = inject(PoiNavigationService);


	@Input()
	poi: PointOfInterest;

	@Input()
	current: CurrentLocation;

	status: NavigationStatus;

	ngOnChanges() {
		this.status = this.service.calculateNavigationStatus(this.poi, this.current);
	}

}
