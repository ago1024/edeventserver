export interface StationFaction {
	Name: string;
	FactionState: string;
}

export interface StationEconomy {
	Name: string;
	Name_Localised: string;
	Proportion: number;
}

export interface ActiveState {
	State: string;
}

export interface RecoveringState {
	State: string;
	Trend: number;
}

export interface PendingState {
	State: string;
	Trend: number;
}

export interface Faction {
	Name: string;
	FactionState: string;
	Government: string;
	Influence: number;
	Allegiance: string;
	Happiness: string;
	Happiness_Localised: string;
	MyReputation: number;
	ActiveStates: ActiveState[];
	RecoveringStates?: RecoveringState[];
	PendingStates?: PendingState[];
}

export interface SystemFaction {
	Name: string;
	FactionState: string;
}
