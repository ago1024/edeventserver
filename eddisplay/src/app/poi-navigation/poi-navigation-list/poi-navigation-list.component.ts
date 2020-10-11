import { Component, OnInit } from '@angular/core';
import { PoiNavigationService } from '../poi-navigation.service';

@Component({
	selector: 'app-poi-navigation-list',
	templateUrl: './poi-navigation-list.component.html',
	styleUrls: ['./poi-navigation-list.component.less']
})
export class PoiNavigationListComponent implements OnInit {

	constructor(public service: PoiNavigationService) { }

	ngOnInit(): void {
	}

}
