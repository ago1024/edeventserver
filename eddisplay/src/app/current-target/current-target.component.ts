import { Component, OnInit } from '@angular/core';
import { CurrentTargetService } from './current-target.service';

@Component({
	selector: 'app-current-target',
	templateUrl: './current-target.component.html',
	styleUrls: ['./current-target.component.less']
})
export class CurrentTargetComponent implements OnInit {

	constructor(public service: CurrentTargetService) {
	}

	ngOnInit(): void {
	}

}
