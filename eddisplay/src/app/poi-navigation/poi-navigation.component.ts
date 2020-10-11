import { Component, OnInit } from '@angular/core';
import { PoiNavigationService } from './poi-navigation.service';

@Component({
	selector: 'app-poi-navigation',
	templateUrl: './poi-navigation.component.html',
	styleUrls: ['./poi-navigation.component.less']
})
export class PoiNavigationComponent implements OnInit {

	constructor(public service: PoiNavigationService) { }

	ngOnInit(): void {
	}

}
