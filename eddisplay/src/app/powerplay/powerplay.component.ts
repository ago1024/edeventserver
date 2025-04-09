import { Component, inject } from '@angular/core';
import { PowerplayEvent, PowerplayMerits, PowerplayService } from './powerplay.service';
import { AsyncPipe } from '@angular/common';
import { map, scan } from 'rxjs/operators';

@Component({
	selector: 'app-powerplay',
	imports: [
		AsyncPipe,
	],
	templateUrl: './powerplay.component.html',
	styleUrl: './powerplay.component.less'
})
export class PowerplayComponent {

	public readonly events$ = inject(PowerplayService).status$.pipe(
		scan((acc, value) => {
			acc.push(value);
			return acc.slice(-3);
		}, [] as PowerplayEvent[]),
		map(list => Array.from(list).reverse()),
	);

	public readonly merits$ = inject(PowerplayService).merits$.pipe(
		scan((acc, value) => {
			acc.push(value);
			return acc.slice(-10);
		}, [] as PowerplayMerits[]),
	)

}
