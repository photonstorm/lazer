import test from 'ava';
import { expect } from 'chai';
import * as state from '../../src/state';

test('State Library Object Definition', t=> {
	expect(state.State).to.be.a('function');
	expect(state.State).to.be.a('function');	
});