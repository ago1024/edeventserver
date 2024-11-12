import { Component, OnInit, inject } from '@angular/core';
import { SystemInfoService } from './system-info.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-system-info',
	templateUrl: './system-info.component.html',
	styleUrls: ['./system-info.component.less'],
	standalone: true,
	imports: [AsyncPipe]
})
export class SystemInfoComponent implements OnInit {
	service = inject(SystemInfoService);


	ngOnInit(): void {
	}

}
