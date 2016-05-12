import test from 'ava';
import { expect } from 'chai';
import * as renderers from '../../src/renderers';

test('Renderer Library Object Definition', t=> {
	const { batchPoint, batchTexture, minimal, nano, point } = renderers;

	expect(batchPoint.WebGLBatchedPoint).to.be.a('function');
	expect(batchTexture.WebGLRenderer).to.be.a('function');
	
	expect(minimal.CanvasRenderer).to.be.a('function');
	expect(minimal.MinimalRenderer).to.be.a('function');
	expect(minimal.WebGLRenderer).to.be.a('function');

	expect(point.CanvasRenderer).to.be.a('function');
	expect(point.PointRenderer).to.be.a('function');
	expect(point.WebGLRenderer).to.be.a('function');
	
	expect(nano.WebGLNano).to.be.a('function');

});