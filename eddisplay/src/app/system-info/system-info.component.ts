import { Component, inject } from '@angular/core';
import { SystemInfoService } from './system-info.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
	selector: 'app-system-info',
	templateUrl: './system-info.component.html',
	styleUrls: ['./system-info.component.less'],
	imports: [AsyncPipe, JsonPipe]
})
export class SystemInfoComponent {
	service = inject(SystemInfoService);
}
