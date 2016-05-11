import test from 'ava';
import { expect } from 'chai';
import * as system from '../../src/system';

test('System Library Object Definition', t=> {
	expect(system.EventDispatcher).to.be.a('function');
	expect(system.MainLoop).to.be.a('function');
	expect(system.NOOP).to.be.a('function');
	expect(system.ParseXML).to.be.a('function');
	expect(system.Signal).to.be.a('function');
	expect(system.SignalBinding).to.be.a('function');
	expect(system.SignalGroup).to.be.a('function');
});