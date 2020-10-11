import { DistancePipe } from './distance.pipe';

describe('DistancePipe', () => {
	it('create an instance', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe).toBeTruthy();
	});

	it('should format 0.4m', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(0.4)).toBe('0.4m');
	});

	it('should format 1.4m', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(1.4)).toBe('1.4m');
	});

	it('should format 10.4m', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(10.4)).toBe('10.4m');
	});

	it('should format 100m', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(100.4)).toBe('100m');
	});

	it('should format 1km', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(1000.4)).toBe('1km');
	});

	it('should format 10.4km', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(10400.4)).toBe('10.4km');
	});

	it('should format 100km', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(100400.4)).toBe('100km');
	});

	it('should format 1.4Mm', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(1400400.4)).toBe('1.4Mm');
	});

	it('should format 10.4Mm', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(10400400.4)).toBe('10.4Mm');
	});

	it('should format 100Mm', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(100400400.4)).toBe('100Mm');
	});

	it('should format 1ls', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(300000000)).toBe('1ls');
	});

	it('should format 1.5ls', () => {
		const pipe = new DistancePipe('en-us');
		expect(pipe.transform(450000000)).toBe('1.5ls');
	});

});
