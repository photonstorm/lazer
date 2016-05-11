import test from 'ava';
import { expect } from 'chai';
import * as create from '../../src/create';

test('Create Library Object Definition', t=> {
	const { palettes } = create;

	expect(create.Grid).to.be.a('function');
	expect(create.RenderToCanvas).to.be.a('function');
	expect(palettes.PALETTE_ARNE).to.be.a('array');
	expect(palettes.PALETTE_C64).to.be.a('array');
	expect(palettes.PALETTE_CGA).to.be.a('array');
	expect(palettes.PALETTE_JMP).to.be.a('array');
	expect(palettes.PALETTE_MSX).to.be.a('array');
});