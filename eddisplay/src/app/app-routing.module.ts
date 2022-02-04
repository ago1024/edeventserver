import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatViewerComponent } from './chat-viewer/chat-viewer.component';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { JournalEventListComponent } from './journal-event-list/journal-event-list.component';
import { MiningEventListComponent } from './mining-event-list/mining-event-list.component';
import { PoiNavigationComponent } from './poi-navigation/poi-navigation.component';
import { SystemInfoComponent } from './system-info/system-info.component';

const routes: Routes = [
	{path: 'journal', component: JournalEventListComponent},
	{path: 'target', component: CurrentTargetComponent},
	{path: 'poi', component: PoiNavigationComponent},
	{path: 'mining', component: MiningEventListComponent},
	{path: 'chat', component: ChatViewerComponent},
	{path: 'sysinfo', component: SystemInfoComponent},
	{path: '**', redirectTo: '/journal' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
