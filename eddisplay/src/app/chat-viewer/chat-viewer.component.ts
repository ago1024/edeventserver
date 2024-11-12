import { Component, OnInit, inject } from '@angular/core';
import { ChatViewerService } from './chat-viewer.service';
import { NgFor } from '@angular/common';
import { ChatEntryComponent } from '../chat-entry/chat-entry.component';

@Component({
	selector: 'app-chat-viewer',
	templateUrl: './chat-viewer.component.html',
	styleUrls: ['./chat-viewer.component.less'],
	standalone: true,
	imports: [NgFor, ChatEntryComponent],
})
export class ChatViewerComponent implements OnInit {
	service = inject(ChatViewerService);


	ngOnInit(): void {
	}

}
