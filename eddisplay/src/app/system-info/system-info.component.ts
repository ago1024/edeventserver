import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from './system-info.service';

@Component({
	selector: 'app-system-info',
	templateUrl: './system-info.component.html',
	styleUrls: ['./system-info.component.less']
})
export class SystemInfoComponent implements OnInit {

	constructor(public service: SystemInfoService) { }

	ngOnInit(): void {
	}

}
