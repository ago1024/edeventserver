import { concatMap } from "rxjs/operators";
import { SaveFileDiscoveryService } from "../savefile-discovery-service/savefile-discovery-service";
import { Engineer, EngineerProgressEvent, JournalEvent, MicroResourcesEvent } from "./events";
import { JournalEventReader, JournalFileObservable } from "./journal-service";


const saveFileService = new SaveFileDiscoveryService();
const journalObservable = new JournalFileObservable(saveFileService.folder, false, true);

type EngineerState = {
	progress: string;
	required: Record<string, number>;
	current: Record<string, number>;
}
const engineerState: {[key:string]: EngineerState} = {
	'Yarden Bond': {
		progress: 'unknown',
		required: {
			smearcampaignplans: 8,
		},
		current: {
			smearcampaignplans: 0,
		},
	},
	'Kit Fowler': {
		progress: 'unknown',
		required: {
			opinionpolls: 10,
		},
		current: {
			opinionpolls: 0,
		},
	},
	'Wellington Beck': {
		progress: 'unknown',
		required: {
			'catmedia': 25,
			'classicentertainment': 25,
			'multimediaentertainment': 25,
		},
		current: {
			'catmedia': 0,
			'classicentertainment': 0,
			'multimediaentertainment': 0,
		},
	},
	'Oden Geiger': {
		progress: 'unknown',
		required: {
			'geneticsample': 20,
			'geneticresearch': 20,
			'geneticdata': 20,
		},
		current: {
			'geneticsample': 0,
			'geneticresearch': 0,
			'geneticdata': 0,
		},
	},
}

journalObservable.pipe(
	//tap(console.log),
	concatMap(entry => JournalEventReader.create(entry, false)),
	//tap(console.log),
).subscribe({
	next: (event: JournalEvent) => {
		if (event.event === 'EngineerProgress') {
			const engineers: Engineer[] = (<EngineerProgressEvent>event).Engineers || [<EngineerProgressEvent>event];
			for (const entry of engineers) {
				if (entry.Engineer in engineerState) {
					if (engineerState[entry.Engineer].progress !== entry.Progress) {
						console.log(event.timestamp, entry);
					}
					engineerState[entry.Engineer].progress = entry.Progress;
				}
			}
		}
		if (event.event == 'SellMicroResources') {
			let printIt = false;
			for (const entry of (<MicroResourcesEvent>event).MicroResources) {
				for (const name in engineerState) {
					const state = engineerState[name];
					if (entry.Name in state.current && state.progress === 'Known') {
						state.current[entry.Name] += entry.Count;
						printIt = true;
					}
				}
			}
			if (printIt)
			{
				console.log(event.timestamp, engineerState);
			}
		}
	},
	complete: () => {
		console.log(engineerState);
	},
	error: (error: Error) => {
		console.error(error);
	}
});
