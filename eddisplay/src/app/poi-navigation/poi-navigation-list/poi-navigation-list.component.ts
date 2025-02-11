import { Component, OnInit, inject } from '@angular/core';
import { PoiNavigationService } from '../poi-navigation.service';
import { PoiNavigationElementComponent } from '../poi-navigation-element/poi-navigation-element.component';

@Component({
	selector: 'app-poi-navigation-list',
	templateUrl: './poi-navigation-list.component.html',
	styleUrls: ['./poi-navigation-list.component.less'],
	standalone: true,
	imports: [PoiNavigationElementComponent]
})
export class PoiNavigationListComponent implements OnInit {
	service = inject(PoiNavigationService);


	ngOnInit(): void {
	}

}
