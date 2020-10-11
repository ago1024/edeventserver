import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { JournalEventListComponent } from './journal-event-list/journal-event-list.component';
import { PoiNavigationComponent } from './poi-navigation/poi-navigation.component';

const routes: Routes = [
	{path: 'journal', component: JournalEventListComponent},
	{path: 'target', component: CurrentTargetComponent},
	{path: 'poi', component: PoiNavigationComponent},
	{path: '**', redirectTo: '/journal' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
