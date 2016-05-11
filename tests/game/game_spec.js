import test from 'ava';
import { expect } from 'chai';
import * as game from '../../src/game';


test('Game Library Object Definition', t => {
	const { nano } = game;

	expect(nano.Game).to.be.a('function');
	expect(nano.Sprite).to.be.a('function');
});

