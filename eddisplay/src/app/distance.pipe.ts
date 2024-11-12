import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform, LOCALE_ID, inject } from '@angular/core';

@Pipe({
	name: 'distance'
})
export class DistancePipe implements PipeTransform {
	private _locale = inject(LOCALE_ID);


	transform(value: unknown, ...args: unknown[]): unknown {
		if (typeof(value) === 'number') {
			const distance: number = value as number;

			if (distance < 1000) {
				return this.format(distance, 'm');
			} else if (distance < 1000_000) {
				return this.format(distance / 1000, 'km');
			} else if (distance < 300_000_000) {
				return this.format(distance / 1000_000, 'Mm');
			} else {
				return this.format(distance / 299_792_458, 'ls');
			}
		}
		return value;
	}

	private format(distance: number, unit: string): string {
		if (distance < 100) {
			return formatNumber(distance, this._locale, '1.0-1') + unit;
		} else {
			return formatNumber(distance, this._locale, '3.0-0') + unit;
		}
	}

}
