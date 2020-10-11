import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	serverEndpoint$: Subject<string>;

	constructor() {
		this.serverEndpoint$ = new BehaviorSubject<string>(environment.serverEndpoint);
	}

}
