import { Component, inject } from '@angular/core';
import { CurrentTargetService } from './current-target.service';
import { PercentPipe } from '@angular/common';

@Component({
	selector: 'app-current-target',
	templateUrl: './current-target.component.html',
	styleUrls: ['./current-target.component.less'],
	imports: [PercentPipe]
})
export class CurrentTargetComponent {
	service = inject(CurrentTargetService);
}
