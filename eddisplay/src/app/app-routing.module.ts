import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';







const routes: Routes = [
	{path: 'journal', loadComponent: () => import('./journal-event-list/journal-event-list.component').then(m => m.JournalEventListComponent)},
	{path: 'target', loadComponent: () => import('./current-target/current-target.component').then(m => m.CurrentTargetComponent)},
	{path: 'poi', loadComponent: () => import('./poi-navigation/poi-navigation.component').then(m => m.PoiNavigationComponent)},
	{path: 'mining', loadComponent: () => import('./mining-event-list/mining-event-list.component').then(m => m.MiningEventListComponent)},
	{path: 'chat', loadComponent: () => import('./chat-viewer/chat-viewer.component').then(m => m.ChatViewerComponent)},
	{path: 'sysinfo', loadComponent: () => import('./system-info/system-info.component').then(m => m.SystemInfoComponent)},
	{path: 'powerplay', loadComponent: () => import('./powerplay/powerplay.component').then(m => m.PowerplayComponent)},
	{path: '**', redirectTo: '/journal' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
