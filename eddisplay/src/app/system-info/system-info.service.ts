import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type FactionState = string;

export interface Faction {
	Name: string;
	FactionState: FactionState;
	Government: string;
	Influence: number;
	Allegiance: string;
	Happiness: string;
	Happiness_Localised: string;
	MyReputation: number;
	RecoveringStates: {
		State: string;
		Trend: number;
	}[];
	ActiveStates: {
		State: string;
	}[];
}

export interface ConflictFaction {
	Name: string;
	Stake?: string;
	WonDays: number;
}

export interface Conflict {
	WarType: 'election' | 'civilwar' | 'war';
	Status: string;
	Faction1: ConflictFaction;
	Faction2: ConflictFaction;
}

export interface FactionsInfoEvent extends JournalEvent {
	event: 'FSDJumpEvent' | 'Location';
	StarSystem: string;
	Factions: Faction[];
	SystemFaction: {
		Name: string;
		FactionState: string;
	};
	Conflicts?: Conflict[];
}

export interface PowerplayInfo {
	ControllingPower: string,
	Powers: string[],
	PowerplayState: string;
	PowerplayStateControlProgress: number;
	PowerplayStateReinforcement: number;
	PowerplayStateUndermining: number;
}

export interface FSDJumpEvent extends FactionsInfoEvent, PowerplayInfo {
	event: 'FSDJumpEvent';
}

export interface LocationEvent extends FactionsInfoEvent, PowerplayInfo {
	event: 'Location';
}

const states = {
	'War': '',
	'CivilWar': '',
	'PirateAttack': ':pirate_flag:',
	'CivilUnrest': '',
	'Bust': 'bust',
	'Election': '',
	'Boom': 'boom',
	'Expansion': 'expansion',
	'Retreat': 'retreat',
	'CivilLiberty': 'civilliberty',
	'PublicHoliday': 'holiday',
	'Outbreak': ':biohazard:',
	'Famine': 'famine',
	'Drought': 'drought',
	'NaturalDisaster': 'disaster',
	'InfrastructureFailure': 'infrafailure',
}
const conflict_types = {
	'war': ':umop:',
	'civilwar': ':umop:',
	'election': ':ballot_box:',
}
const conflict_status = {
	'pending': ':timer:',
	'active': '',
}

const formatter = Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1});

@Injectable({
	providedIn: 'root'
})
export class SystemInfoService {

	private readonly eventService = inject(EdEventService);

	public readonly event$ = this.eventService.events$
		.pipe(
			switchMap(event => {
				switch (event?.event) {
					case 'FSDJump':
						return of(event as FSDJumpEvent);
					case 'Location':
						return of(event as LocationEvent);
					default:
						return EMPTY;
				}
			}),
			shareReplay({ refCount: false, bufferSize: 1 }),
		);


	private readonly _current = new BehaviorSubject<FactionsInfoEvent>(undefined);

	public readonly currentInfo$ = this._current.pipe(
		filter(event => !!event && !!event.Factions),
		map(event => this.createInfo(event)),
		catchError(error => {
			console.error(error);
			return EMPTY;
		}),
	);

	constructor() {

		this.event$.pipe(
			takeUntilDestroyed(),
			filter(event => !!event.Factions),
		).subscribe(this._current);
	}

	private createInfo(info: FactionsInfoEvent) {
		const lines: string[] = [];

		lines.push(`:satellite: ${info.StarSystem}`);

		for (const faction of (info.Factions || []).sort((a,b) => b.Influence - a.Influence)) {

			const conflict = (info.Conflicts || [])
				.filter(conflict => conflict.Faction1?.Name === faction.Name || conflict.Faction2?.Name === faction.Name)
				.map(conflict => conflict.Faction1.Name == faction.Name ? conflict : {...conflict, Faction1: conflict.Faction2, Faction2: conflict.Faction1})
				.shift();

			const standings = conflict && conflict.Status &&
				`(${conflict_types[conflict.WarType]}${conflict_status[conflict.Status] || ''} ${conflict.Faction1.WonDays}-${conflict.Faction2.WonDays})` || '';

			const faction_states = [standings, ...(faction.ActiveStates || []).map(state => (state.State && states[state.State]) ?? console.warn('Unsupported State', state.State) ?? '')]
				.filter(Boolean)
				.join(' ');

			lines.push(`${faction.Name}: ${formatter.format(faction.Influence)} ${faction_states}`);
		}
		return lines.join('\n');
	}
}
