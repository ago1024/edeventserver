import { Component, inject } from '@angular/core';
import { PowerplayService } from './powerplay.service';
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
		}, []),
		map(list => Array.from(list).reverse()),
	);

}
