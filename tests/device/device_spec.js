import test from 'ava';
import { expect } from 'chai';
import * as device from '../../src/device';

test('Device Library Object Definition', t => {
	const { feature } = device;

	expect(device.WebGL).to.be.a('function');
	expect(device.Browser).to.be.a('function');
	expect(device.Device).to.be.a('function');
	expect(device.Endian).to.be.a('function');
	expect(device.Features).to.be.a('function');
	expect(device.Input).to.be.a('function');
	expect(device.OS).to.be.a('function');
});
