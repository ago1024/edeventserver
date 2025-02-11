import { Component, OnInit, inject } from '@angular/core';
import { ChatViewerService } from './chat-viewer.service';
import { ChatEntryComponent } from '../chat-entry/chat-entry.component';

@Component({
	selector: 'app-chat-viewer',
	templateUrl: './chat-viewer.component.html',
	styleUrls: ['./chat-viewer.component.less'],
	standalone: true,
	imports: [ChatEntryComponent],
})
export class ChatViewerComponent implements OnInit {
	service = inject(ChatViewerService);


	ngOnInit(): void {
	}

}
