
export interface JournalEvent {
	event: string;
	timestamp: string;
}

export interface ShipTargetedEvent extends JournalEvent {
	TargetLocked: boolean;
	Ship: string;
	ScanStage: number;
	PilotName: string;
	PilotName_Localised: string;
	PilotRank: string;
	ShieldHealth: number;
	HullHealth: number;
	Faction: string;
	LegalStatus: string;
	Bounty?: number;
}