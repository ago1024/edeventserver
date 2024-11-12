import { Component, OnInit, inject } from '@angular/core';
import { ChatViewerService } from './chat-viewer.service';

@Component({
	selector: 'app-chat-viewer',
	templateUrl: './chat-viewer.component.html',
	styleUrls: ['./chat-viewer.component.less'],
})
export class ChatViewerComponent implements OnInit {
	service = inject(ChatViewerService);


	ngOnInit(): void {
	}

}
