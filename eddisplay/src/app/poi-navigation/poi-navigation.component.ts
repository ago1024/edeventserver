import { Component, OnInit, inject } from '@angular/core';
import { PoiNavigationService } from './poi-navigation.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoiNavigationListComponent } from './poi-navigation-list/poi-navigation-list.component';

@Component({
	selector: 'app-poi-navigation',
	templateUrl: './poi-navigation.component.html',
	styleUrls: ['./poi-navigation.component.less'],
	standalone: true,
	imports: [NgIf, FormsModule, PoiNavigationListComponent]
})
export class PoiNavigationComponent implements OnInit {
	service = inject(PoiNavigationService);


	poiName: string;

	poiLon: number;

	poiLat: number;

	addPoi(): void {
		if (this.poiLon === undefined || this.poiLat === undefined || !this.service.location) {
			return;
		}

		this.service.addPointOfInterest({
			Name: this.poiName || new Date().toISOString(),
			Longitude: this.poiLon,
			Latitude: this.poiLat,
			BodyName: this.service.location.BodyName,
		});
		this.poiName = undefined;
		this.poiLon = undefined;
		this.poiLat = undefined;
	}

	addCurrentLocation(): void {
		this.service.addPointOfInterest({
			Name: this.poiName || new Date().toISOString(),
			Longitude: this.service.location.Longitude,
			Latitude: this.service.location.Latitude,
			BodyName: this.service.location.BodyName,
		});
		this.poiName = undefined;
	}


	ngOnInit(): void {
	}

}
