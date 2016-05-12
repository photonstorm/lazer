import test from 'ava';
import { expect } from 'chai';
import * as webgl from '../../src/webgl';

test('WebGL Library Object Definition', t => {
	const { Attribute, vbo } = webgl;

	expect(Attribute.disable).to.be.a('function');
	expect(Attribute.getLocation).to.be.a('function');
	expect(Attribute.createByte).to.be.a('function');
	expect(Attribute.createShort).to.be.a('function');
	expect(Attribute.createUnsignedShort).to.be.a('function');
	expect(Attribute.createInt).to.be.a('function');
	expect(Attribute.createUnsignedInt).to.be.a('function');
	expect(Attribute.createFloat).to.be.a('function');

	expect(webgl.CompileShader).to.be.a('function');
	expect(webgl.WebGLContextHandler).to.be.a('function');
	expect(webgl.WebGLContextOptions).to.be.a('function');
	expect(webgl.GLTexture).to.be.a('function');
	expect(webgl.GetContext).to.be.a('function');
	expect(webgl.WebGLProgram).to.be.a('function');
	expect(webgl.RenderList).to.be.a('function');
	expect(webgl.WebGLShader).to.be.a('function');
	expect(webgl.VertexBuffer).to.be.a('function');

	expect(vbo.AddQuadAlphaColor).to.be.a('function');
	expect(vbo.AddVert).to.be.a('function');
	expect(vbo.VertexArrayBuffer).to.be.a('function');
	expect(vbo.VertexIndexBuffer).to.be.a('function');

});