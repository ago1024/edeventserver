import { Component, inject } from '@angular/core';
import { ChatViewerService } from './chat-viewer/chat-viewer.service';
import { CurrentTargetService } from './current-target/current-target.service';
import { JournalEventListService } from './journal-event-list/journal-event-list.service';
import { MiningEventListService } from './mining-event-list/mining-event-list.service';
import { PoiNavigationService } from './poi-navigation/poi-navigation.service';
import { SystemInfoService } from './system-info/system-info.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PowerplayService } from './powerplay/powerplay.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	standalone: true,
	imports: [
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
	],
})
export class AppComponent {
  poiNavigationService = inject(PoiNavigationService);
  chatViewerService = inject(ChatViewerService);
  journalEventListService = inject(JournalEventListService);
  miningEventListService = inject(MiningEventListService);
  currentTargetService = inject(CurrentTargetService);
  systemInfoService = inject(SystemInfoService);
  powerplayService = inject(PowerplayService);

  title = 'eddisplay';;
}
