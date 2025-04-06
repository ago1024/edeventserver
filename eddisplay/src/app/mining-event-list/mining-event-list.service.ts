import { Injectable, inject } from '@angular/core';
import { buffer, filter, map, scan, shareReplay, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { EdEventService } from '../ed-event.service';
import { JournalEvent } from '../interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

export interface LoadoutEvent extends JournalEvent {
	event: 'Loadout';
	CargoCapacity: number;
}

export interface CargoEvent extends JournalEvent {
	event: 'Cargo';
	Vessel: string;
	Count: number;
}

export interface LoadoutEvent extends JournalEvent {
	event: 'Loadout';
	Modules: {
		Slot: string;
		Item: string;
	}[];
}

export interface ProspectedAsteroidEvent extends JournalEvent {
	event: 'ProspectedAsteroid';
	Matetrials: {
		Name: string;
		Proportion: number;
	}[];
	MotherlodeMaterial?: string;
	Content: string;
	Content_Localised: string;
	'Material Content': string;
	Remaining: number;
}

const PROSPECTOR_COUNT = {
	int_dronecontrol_prospector_size3_class5: 2,
}

@Injectable({
	providedIn: 'root'
})
export class MiningEventListService {
	private edEventService = inject(EdEventService);

	public readonly cargoCapacity$ = this.edEventService.events$.pipe(
		takeUntilDestroyed(),
		filter((event): event is LoadoutEvent => event.event === 'Loadout'),
		filter(event => event.CargoCapacity != undefined),
		map(event => event.CargoCapacity),
		shareReplay(1),
	);

	public readonly cargoCount$ = this.edEventService.events$.pipe(
		takeUntilDestroyed(),
		filter((event): event is CargoEvent => event.event === 'Cargo'),
		filter(event => event.Count != undefined && event.Vessel === 'Ship'),
		map(event => event.Count),
		shareReplay(1),
	);

	private readonly prospectorLimpetCount$ = this.edEventService.events$.pipe(
		filter((event): event is LoadoutEvent => event.event === 'Loadout'),
		map(event => (event.Modules ?? []).reduce((count, module) => count + (PROSPECTOR_COUNT[module.Item] ?? 0), 0)),
		startWith(0),
	);

	public readonly prospected$ = this.edEventService.events$.pipe(
		takeUntilDestroyed(),
		filter((event): event is ProspectedAsteroidEvent => event.event === 'ProspectedAsteroid'),
	);

	public readonly lastProspected$ = this.prospected$.pipe(
		withLatestFrom(this.prospectorLimpetCount$),
		scan((acc, [event, prospectorCount]) => [event, ...acc].slice(0, prospectorCount), [] as ProspectedAsteroidEvent[]),
		shareReplay(1),
	);

	public readonly motherlodeCounter$ = this.prospected$.pipe(
		filter(event => !!event.MotherlodeMaterial),
		buffer(this.edEventService.events$.pipe(filter(event => ['LoadGame', 'SupercruiseExit', 'SupercruiseEntry', 'FSDJump'].includes(event.event)))),
		filter(events => events.length > 0),
		map(events => events.reduce((acc, event) => {
			acc[event.MotherlodeMaterial] = 1 + (acc[event.MotherlodeMaterial] ?? 0);
			return acc;
		}, {})),
		tap(events => console.log(events)),
	);

	private readonly subscription = new Subscription()
		.add(this.motherlodeCounter$.subscribe())
		.add(this.lastProspected$.subscribe())
		.add(this.cargoCount$.subscribe())
		.add(this.cargoCapacity$.subscribe());

	miningEvents: JournalEvent[] = [];

	constructor() {
		this.edEventService.events$
			.pipe(
				filter(event => {
					switch (event.event) {
						case 'ProspectedAsteroid':
						case 'Cargo':
							return true;
						default:
							return false;
					}
				})
			)
			.subscribe((event: JournalEvent) => this.next(event));
	}

	private next(event: JournalEvent): void {
		this.miningEvents.unshift(event);
		while (this.miningEvents.length > 10) {
			this.miningEvents.pop();
		}
	}
}
