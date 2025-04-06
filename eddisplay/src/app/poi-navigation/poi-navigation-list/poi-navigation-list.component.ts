import { Component, inject } from '@angular/core';
import { PoiNavigationService } from '../poi-navigation.service';
import { PoiNavigationElementComponent } from '../poi-navigation-element/poi-navigation-element.component';

@Component({
	selector: 'app-poi-navigation-list',
	templateUrl: './poi-navigation-list.component.html',
	styleUrls: ['./poi-navigation-list.component.less'],
	imports: [PoiNavigationElementComponent]
})
export class PoiNavigationListComponent {
	service = inject(PoiNavigationService);

}
