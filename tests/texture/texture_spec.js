import test from 'ava';
import { expect } from 'chai';
import * as texture from '../../src/texture';

const { blendmodes, textureDefault, parsers } = texture;
const { canvas, webgl } = blendmodes;


test('Texture Library Object Definition', t=> {
	expect(texture.Frame).to.be.a('function');
	expect(texture.FrameSet).to.be.a('function');
	expect(texture.SetTrim).to.be.a('function');
	expect(texture.Texture2D).to.be.a('function');
	expect(texture.TextureDiv).to.be.a('function');
	expect(texture.TextureWebGL).to.be.a('function');
	expect(texture.UpdateUVs).to.be.a('function');

	expect(textureDefault .Blank32x32).to.be.a('function');
	expect(textureDefault .MissingImage32x32).to.be.a('function');
});

test('Texture Blend Modes Library Object Definition', t=> {
	expect(canvas.Add).to.be.a('function');
	expect(canvas.Color).to.be.a('function');
	expect(canvas.ColorBurn).to.be.a('function');
	expect(canvas.ColorDodge).to.be.a('function');
	expect(canvas.Darken).to.be.a('function');
	expect(canvas.Difference).to.be.a('function');
	expect(canvas.Exclusion).to.be.a('function');
	expect(canvas.HardLight).to.be.a('function');
	expect(canvas.Hue).to.be.a('function');
	expect(canvas.Lighten).to.be.a('function');
	expect(canvas.Luminosity).to.be.a('function');
	expect(canvas.Multiply).to.be.a('function');
	expect(canvas.Normal).to.be.a('function');
	expect(canvas.Overlay).to.be.a('function');
	expect(canvas.Saturation).to.be.a('function');
	expect(canvas.Screen).to.be.a('function');
	expect(canvas.SoftLight).to.be.a('function');

	expect(webgl.Add).to.be.a('function');
	expect(webgl.Color).to.be.a('function');
	expect(webgl.ColorBurn).to.be.a('function');
	expect(webgl.ColorDodge).to.be.a('function');
	expect(webgl.Darken).to.be.a('function');
	expect(webgl.Difference).to.be.a('function');
	expect(webgl.Exclusion).to.be.a('function');
	expect(webgl.HardLight).to.be.a('function');
	expect(webgl.Hue).to.be.a('function');
	expect(webgl.Lighten).to.be.a('function');
	expect(webgl.Luminosity).to.be.a('function');
	expect(webgl.Multiply).to.be.a('function');
	expect(webgl.Normal).to.be.a('function');
	expect(webgl.Overlay).to.be.a('function');
	expect(webgl.Saturation).to.be.a('function');
	expect(webgl.Screen).to.be.a('function');
	expect(webgl.SoftLight).to.be.a('function');

});

test('Texture Parsers Library Object Definition', t=> {
	expect(parsers.Image).to.be.a('function');
	expect(parsers.SpriteSheet).to.be.a('function');
	expect(parsers.TexturePackerJSONArray).to.be.a('function');
	expect(parsers.TexturePackerJSONHash).to.be.a('function');

});