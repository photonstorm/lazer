import test from 'ava';
import { expect } from 'chai';
import * as components from '../../src/components';

test('Components Library Object Definition', t => {
	expect(components.GameObjectFactory).to.be.a('function');
	expect(components.Position).to.be.a('function');
	expect(components.Transform).to.be.a('function');
	expect(components.Transform2D).to.be.a('function');
});