import { Component, inject } from '@angular/core';
import { PowerplayEvent, PowerplayService } from './powerplay.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { filter, map, scan } from 'rxjs/operators';
import { SystemInfoService } from '../system-info/system-info.service';
import { pick } from 'lodash';


const StateControlPoints = {
	'Unoccupied': 120000,
	'Exploited': 350000,
	'Fortified': 650000,
	'Stronghold': 15000000,
}
const StateMeritFactor = {
	'Unoccupied': 4 * 1.05,
	'Exploited': 4 * 0.65,
	'Fortified': 4 * 0.65,
	'Stronghold': 4 * 0.65,
}

@Component({
	selector: 'app-powerplay',
	imports: [
		AsyncPipe,
		JsonPipe,
	],
	templateUrl: './powerplay.component.html',
	styleUrl: './powerplay.component.less'
})
export class PowerplayComponent {

	private remaining(state: { PowerplayState: string, PowerplayStateControlProgress: number }) {
		if (!state || !state.PowerplayState || !state.PowerplayStateControlProgress || !StateControlPoints[state.PowerplayState]) {
			return {};
		}

		const RemainingControlProgress = Math.round((1 - state.PowerplayStateControlProgress) * 1000000) / 1000000;
		const RemainingControlPoints = Math.round(RemainingControlProgress * StateControlPoints[state.PowerplayState]);
		const RemainingMerits = Math.floor(RemainingControlPoints * StateMeritFactor[state.PowerplayState]);
		return { RemainingControlProgress, RemainingControlPoints, RemainingMerits };
	}

	public readonly systemInfo$ = inject(SystemInfoService).event$.pipe(
		filter(info => !!info.PowerplayState),
		map(info => pick(info, 'StarSystem', 'PowerplayState', 'PowerplayStateControlProgress', 'PowerplayStateReinforcement', 'PowerplayStateUndermining', 'ControllingPower')),
		map(info => {
			const remaining = this.remaining(info);
			return {
				...info,
				...remaining,
			};
		})
	);

	private readonly service = inject(PowerplayService);
	public readonly events$ = this.service.status$.pipe(
		scan((acc, value) => {
			acc.push(value);
			return acc.slice(-3);
		}, [] as PowerplayEvent[]),
		map(list => Array.from(list).reverse()),
	);

	public readonly merits$ = this.service.merits$;

}
