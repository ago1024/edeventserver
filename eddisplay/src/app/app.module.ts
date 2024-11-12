import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatEntryComponent } from './chat-entry/chat-entry.component';
import { ChatViewerComponent } from './chat-viewer/chat-viewer.component';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { DistancePipe } from './distance.pipe';
import { JournalEventListComponent } from './journal-event-list/journal-event-list.component';
import { JournalEventComponent } from './journal-event/journal-event.component';
import { MiningEventListComponent } from './mining-event-list/mining-event-list.component';
import { MiningEventComponent } from './mining-event/mining-event.component';
import { PoiNavigationElementComponent } from './poi-navigation/poi-navigation-element/poi-navigation-element.component';
import { PoiNavigationListComponent } from './poi-navigation/poi-navigation-list/poi-navigation-list.component';
import { PoiNavigationComponent } from './poi-navigation/poi-navigation.component';
import { SystemInfoComponent } from './system-info/system-info.component';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		JournalEventListComponent,
		JournalEventComponent,
		CurrentTargetComponent,
		PoiNavigationComponent,
		PoiNavigationListComponent,
		PoiNavigationElementComponent,
		DistancePipe,
		MiningEventListComponent,
		MiningEventComponent,
		ChatEntryComponent,
		ChatViewerComponent,
		SystemInfoComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
