import test from 'ava';
import { expect } from 'chai';
import * as sound from '../../src/sound';

	const { sfxr } = sound;
	const { data, effects, synths, webaudio } = sfxr;
	const { generators } = data;

test('Sound Library Object Definition', t=> {
	expect(sfxr.Rand).to.be.a('function');
	expect(sfxr.RandFloat).to.be.a('function');
	expect(sfxr.Shapes).to.be.a('function');
});

test('Sound Data Library Object Definition', t=> {
	expect(data.GenerateData).to.be.a('function');
	expect(data.UpdateData).to.be.a('function');	
});

test('Sound Effects Library Object Definition', t=> {
	expect(effects.Effect).to.be.a('function');
	expect(effects.Envelope).to.be.a('function');
	expect(effects.HighPassFilter).to.be.a('function');
	expect(effects.LowPassFilter).to.be.a('function');
	expect(effects.Phaser).to.be.a('function');
	expect(effects.Repeat).to.be.a('function');
	expect(effects.SquareDuty).to.be.a('function');
	expect(effects.Tonal).to.be.a('function');
	expect(effects.Tone).to.be.a('function');
	expect(effects.Vibrato).to.be.a('function');
});

test('Sound Synths Library Object Definition', t=> {	
	expect(synths.BlipSelect).to.be.a('function');
	expect(synths.Explosion).to.be.a('function');
	expect(synths.HitHurt).to.be.a('function');
	expect(synths.LaserShoot).to.be.a('function');
	expect(synths.PickUpCoin).to.be.a('function');
	expect(synths.PowerUp).to.be.a('function');
	expect(synths.PushSound).to.be.a('function');
	expect(synths.Random).to.be.a('function');
});

test('Sound Webaudio Library Object Definition', t=> {
	expect(webaudio.Generate).to.be.a('function');
	expect(webaudio.Generate).to.be.a('function');
});