import test from 'ava';
import { expect } from 'chai';
import * as utils from '../../src/utils';

test('Utils Library Object Definition', t => {
	expect(utils.Banner).to.be.a('function');
	expect(utils.Compose).to.be.a('function');
});

test('Utils Array Library Object Definition', t => {
	const { array } = utils;
	const { matrix } = array;

	expect(array.FindClosestInSorted).to.be.a('function');
	expect(array.GetRandomElement).to.be.a('function');
	expect(array.NumberArray).to.be.a('function');
	expect(array.NumberArrayStep).to.be.a('function');
	expect(array.RemoveRandomElement).to.be.a('function');
	expect(array.RotateLeft).to.be.a('function');
	expect(array.RotateRight).to.be.a('function');
	expect(array.Shuffle).to.be.a('function');
	expect(array.SpliceOne).to.be.a('function');

	expect(matrix.CheckMatrix).to.be.a('function');
	expect(matrix.MatrixToString).to.be.a('function');
	expect(matrix.ReverseColumns).to.be.a('function');
	expect(matrix.ReverseRows).to.be.a('function');
	expect(matrix.Rotate180).to.be.a('function');
	expect(matrix.RotateLeft).to.be.a('function');
	expect(matrix.RotateMatrix).to.be.a('function');
	expect(matrix.RotateRight).to.be.a('function');
	expect(matrix.TransposeMatrix).to.be.a('function');

});

test('Utils String Library Object Definition', t=> {
	const { string } = utils;
	
	expect(string.Pad).to.be.a('function');
});