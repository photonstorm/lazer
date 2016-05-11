import test from 'ava';
import { expect } from 'chai';
import * as loader from '../../src/loader';

test('Loader Library Object Definition', t => {
	expect(loader.BaseLoader).to.be.a('function');
	expect(loader.File).to.be.a('function');
	expect(loader.Loader).to.be.a('function');
	expect(loader.MergeXHRSettings).to.be.a('function');
	expect(loader.MultiFile).to.be.a('function');
	expect(loader.XHRLoader).to.be.a('function');
	expect(loader.XHRSettings).to.be.a('function');
});

test('Loader Types Library Object Definition', t=> {
	const { types } = loader;
	
	expect(types.AtlasJSONFile).to.be.a('function');
	expect(types.AtlasXMLFile).to.be.a('function');
	expect(types.BinaryFile).to.be.a('function');
	expect(types.GLSLFile).to.be.a('function');
	expect(types.ImageFile).to.be.a('function');
	expect(types.JSONFile).to.be.a('function');
	expect(types.TextFile).to.be.a('function');
	expect(types.XMLFile).to.be.a('function');
});