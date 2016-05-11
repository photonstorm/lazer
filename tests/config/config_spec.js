import test from 'ava';
import { expect } from 'chai';
import * as config from '../../src/config';

test('Config Library Object Definition', t => {
	const { settings } = config;

	expect(config.Config).to.be.a('function');
	expect(settings.Dimensions).to.be.a('function');
	expect(settings.DisableAudio).to.be.a('function');
	expect(settings.DisableWebAudio).to.be.a('function');
	expect(settings.DisableWebGL).to.be.a('function');
	expect(settings.FrameRate).to.be.a('function');
	expect(settings.GameTitle).to.be.a('function');
	expect(settings.Parent).to.be.a('function');
	expect(settings.PixelArt).to.be.a('function');
	expect(settings.State).to.be.a('function');
	expect(settings.Transparent).to.be.a('function');
});