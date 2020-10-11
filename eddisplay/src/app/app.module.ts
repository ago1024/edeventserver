import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalEventListComponent } from './journal-event-list/journal-event-list.component';
import { JournalEventComponent } from './journal-event/journal-event.component';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { PoiNavigationComponent } from './poi-navigation/poi-navigation.component';
import { PoiNavigationListComponent } from './poi-navigation/poi-navigation-list/poi-navigation-list.component';
import { PoiNavigationElementComponent } from './poi-navigation/poi-navigation-element/poi-navigation-element.component';
import { FormsModule } from '@angular/forms';
import { DistancePipe } from './distance.pipe';

@NgModule({
	declarations: [
		AppComponent,
		JournalEventListComponent,
		JournalEventComponent,
		CurrentTargetComponent,
		PoiNavigationComponent,
		PoiNavigationListComponent,
		PoiNavigationElementComponent,
		DistancePipe,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
