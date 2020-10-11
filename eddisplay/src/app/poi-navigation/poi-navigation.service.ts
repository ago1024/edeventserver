import { Injectable } from '@angular/core';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';
import { filter } from 'rxjs/operators';

import * as sample from './poi-navigation.service.sample.json';
import { environment } from 'src/environments/environment';

export interface Location {
	Latitude: number;
	Longitude: number;
	BodyName: string;
}

export interface CurrentLocation extends Location {
	PlanetRadius?: number;
}

export interface PointOfInterest extends Location {
	Name?: string;
}

export interface StatusEvent extends JournalEvent, CurrentLocation {
}

export interface NavigationStatus {
	From: Location;
	To: Location;
	RadialDistance: number;
	Distance?: number;
	Bearing: number;
}

@Injectable({
	providedIn: 'root'
})
export class PoiNavigationService {

	pois: PointOfInterest[] = [];
	location: CurrentLocation;

	constructor(eventService: EdEventService) {
		eventService.events$
			.pipe(filter(event => event.event === 'Status'))
			.subscribe(event => this.updateStatus(event as StatusEvent));

		if (!environment.production) {
			// Debug values
			this.pois = sample.pois;
			this.location = sample.location;
		}
	}

	private updateStatus(event: StatusEvent): void {
		if (!event || !event.BodyName || event.Longitude === undefined || event.Latitude === undefined) {
			this.location = undefined;
		} else {
			this.location = event;
		}
	}

	addPointOfInterest(poi: PointOfInterest): void {
		this.removePointOfInterest(poi);
		this.pois.unshift(poi);
	}

	removePointOfInterest(poi: PointOfInterest): void {
		const pos = this.pois.indexOf(poi);
		if (pos !== -1) {
			this.pois.splice(pos, 1);
		}
	}

	calculateNavigationStatus(to: Location, from?: CurrentLocation): NavigationStatus {
		if (!from) {
			from = this.location;
		}
		if (!from || !to || !from.BodyName || !to.BodyName || from.BodyName !== to.BodyName) {
			return undefined;
		}

		const lat1 = from.Latitude;
		const lat2 = to.Latitude;
		const lon1 = from.Longitude;
		const lon2 = to.Longitude;

		const φ1 = lat1 * Math.PI/180; // φ, λ in radians
		const φ2 = lat2 * Math.PI/180;
		const Δφ = (lat2-lat1) * Math.PI/180;
		const Δλ = (lon2-lon1) * Math.PI/180;

		const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
							Math.cos(φ1) * Math.cos(φ2) *
							Math.sin(Δλ/2) * Math.sin(Δλ/2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		const y = Math.sin(Δλ) * Math.cos(φ2);
		const x = Math.cos(φ1)*Math.sin(φ2) -
							Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
		const θ = Math.atan2(y, x);
		const brng = (θ*180/Math.PI + 360) % 360; // in degrees

		const d = from.PlanetRadius ? from.PlanetRadius * c : undefined; // in metres

		return {
			From: from,
			To: to,
			RadialDistance: c,
			Distance: d,
			Bearing: brng,
		};
	}
}
