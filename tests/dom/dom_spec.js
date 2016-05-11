import test from 'ava';
import { expect } from 'chai';
import * as dom from '../../src/dom';

test('DOM Library Object Definition', t => {
	expect(dom.AddEventListener).to.be.a('function');
	expect(dom.AddToDOM).to.be.a('function');
	expect(dom.Boot).to.be.a('function');
	expect(dom.RemoveEventListener).to.be.a('function');
	expect(dom.RemoveFromDOM).to.be.a('function');
	expect(dom.RequestAnimationFrame).to.be.a('function');
});