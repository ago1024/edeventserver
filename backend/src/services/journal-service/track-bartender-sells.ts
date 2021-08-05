import { concatMap } from "rxjs/operators";
import { SaveFileDiscoveryService } from "../savefile-discovery-service/savefile-discovery-service";
import { JournalEvent, MicroResourcesEvent } from "./events";
import { JournalEventReader, JournalFileObservable } from "./journal-service";


const saveFileService = new SaveFileDiscoveryService();
const journalObservable = new JournalFileObservable(saveFileService.folder, false, true);


const counter: Record<string, number> = {
	'catmedia': 0,
	'opinionpolls': 0,
	'classicentertainment': 0,
	'multimediaentertainment': 0,
};
journalObservable.pipe(
	//tap(console.log),
	concatMap(entry => JournalEventReader.create(entry, false)),
	//tap(console.log),
).subscribe({
	next: (event: JournalEvent) => {
		if (event.event == 'SellMicroResources') {
			let printIt = false;
			for (const entry of (<MicroResourcesEvent>event).MicroResources) {
				if (entry.Name in counter) {
					counter[entry.Name] += entry.Count;
					printIt = true;
				}
			}
			if (printIt)
				console.log(event.timestamp, counter);
		}
	},
	error: (error: Error) => {
		console.error(error);
	}
});
