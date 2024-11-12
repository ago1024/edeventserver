import { Component, OnInit, inject } from '@angular/core';
import { CurrentTargetService } from './current-target.service';
import { PercentPipe } from '@angular/common';

@Component({
	selector: 'app-current-target',
	templateUrl: './current-target.component.html',
	styleUrls: ['./current-target.component.less'],
	standalone: true,
	imports: [PercentPipe]
})
export class CurrentTargetComponent implements OnInit {
	service = inject(CurrentTargetService);


	ngOnInit(): void {
	}

}
