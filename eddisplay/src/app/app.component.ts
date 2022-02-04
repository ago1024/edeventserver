import { Component } from '@angular/core';
import { ChatViewerService } from './chat-viewer/chat-viewer.service';
import { CurrentTargetService } from './current-target/current-target.service';
import { JournalEventListService } from './journal-event-list/journal-event-list.service';
import { MiningEventListService } from './mining-event-list/mining-event-list.service';
import { PoiNavigationService } from './poi-navigation/poi-navigation.service';
import { SystemInfoService } from './system-info/system-info.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'eddisplay';

  constructor(
	public poiNavigationService: PoiNavigationService,
	public chatViewerService: ChatViewerService,
	public journalEventListService: JournalEventListService,
	public miningEventListService: MiningEventListService,
	public currentTargetService: CurrentTargetService,
	public systemInfoService: SystemInfoService,
  ) {};
}
