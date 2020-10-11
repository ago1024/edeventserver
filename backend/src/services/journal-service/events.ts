/* eslint-disable @typescript-eslint/no-empty-interface */

import { Faction, StationEconomy, StationFaction, SystemFaction } from "./interfaces";

/**
 * Timestamp as ISO timestamp
 */
export type IsoTimestamp = string;

export interface JournalEvent {
	event: string;
	timestamp: IsoTimestamp;
}

export interface StatusEvent extends JournalEvent {
}

export interface StarSystemEvent extends JournalEvent {
	SystemAddress: number;
	StarSystem: string;
}

export interface FileheaderEvent extends JournalEvent {
	part: string;
	language: string;
	gameversion: string;
	build: string;
}

export interface MusicEvent extends JournalEvent {
	MusicTrack: string; 
}

export interface CommanderEvent extends JournalEvent {
	FID: string;
	Name: string;
}

export interface MaterialsEvent extends JournalEvent {
	Raw: {
		Name: string;
		Name_Localised?: string;
		Count: number;
	}[];
}

export interface LoadGameEvent extends JournalEvent {
	FID: string;
	Commander: string;
	Horizons: boolean;
	Ship: string;
	Ship_Localised: string;
	ShipID: number;
	ShipName: string;
	ShipIdent: string;
	FuelLevel: number;
	FuelCapacity: number;
	GameMode: string;
	Credits: number;
	Load: number;
}

export interface LocationEvent extends StarSystemEvent {
	Docked: boolean;
	StationName: string;
	StationType: string;
	MarketID: number;
	StationFaction: StationFaction;
	StationGovernment: string;
	StationGovernment_Localised: string;
	StationServices: string[];
	StationEconomy: string;
	StationEconomy_Localised: string;
	StationEconomies: StationEconomy[];
	StarSystem: string;
	SystemAddress: number;
	StarPos: number[];
	SystemAllegiance: string;
	SystemEconomy: string;
	SystemEconomy_Localised: string;
	SystemSecondEconomy: string;
	SystemSecondEconomy_Localised: string;
	SystemGovernment: string;
	SystemGovernment_Localised: string;
	SystemSecurity: string;
	SystemSecurity_Localised: string;
	Population: number;
	Body: string;
	BodyID: number;
	BodyType: string;
	Factions: Faction[];
	SystemFaction: SystemFaction;
}

export interface FSSSignalDiscoveredEvent extends JournalEvent {
	SystemAddress: number;
	SignalName: string;
	SignalName_Localised?: string;
	IsStation?: boolean;
}

export interface NavRouteEvent extends JournalEvent {
}

export interface FSDTargetEvent extends JournalEvent {
	Name: string;
	SystemAddress: number;
	StarClass: string;
	RemainingJumpsInRoute: number;
}

export enum JumpType {
	Hyperspace = "Hyperspace",
	Supercruise = "Supercruise",
}

export interface StartJumpEvent extends JournalEvent {
	JumpType: JumpType;
	StarSystem?: string;
	SystemAddress?: number;
	StarClass?: string;
}

export interface FSSDiscoveryScanEvent extends JournalEvent {
	Progress: number;
	BodyCount: number;
	NonBodyCount: number;
	SystemName: string;
	SystemAddress: number;
}

export interface FSSAllBodiesFoundEvent extends JournalEvent {
	SystemName: string;
	SystemAddress: number;
	Count: number;
}

export interface SAASignalsFoundEvent extends JournalEvent {
	BodyName: string;
	SystemAddress: number;
	BodyID: number;
	Signals: {
		Type: string;
		Type_Localised?: string;
		Count: number;
	}[];
}

export interface ShipTargetedEvent extends JournalEvent {
	TargetLocked: boolean;
	Ship?: string;
	ScanStage?: number;
	PilotName?: string;
	PilotName_Localised?: string;
	PilotRank?: string;
	ShieldHealth?: number;
	HullHealth?: number;
	Faction?: string;
	LegalStatus?: string;
	Bounty?: number;
}

export interface FSDJumpEvent extends StarSystemEvent {
	StarSystem: string;
	SystemAddress: number;
	StarPos: number[];
	SystemAllegiance: string;
	SystemEconomy: string;
	SystemEconomy_Localised: string;
	SystemSecondEconomy: string;
	SystemSecondEconomy_Localised: string;
	SystemGovernment: string;
	SystemGovernment_Localised: string;
	SystemSecurity: string;
	SystemSecurity_Localised: string;
	Population: number;
	Body: string;
	BodyID: number;
	BodyType: string;
	JumpDist: number;
	FuelUsed: number;
	FuelLevel: number;
}