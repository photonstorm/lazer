import test from 'ava';
import { expect } from 'chai';
import * as time from '../../src/time';

test('Time Library Object Definition', t=> {
	expect(time.Clock).to.be.a('function');
	expect(time.MasterClock).to.be.a('function');

});