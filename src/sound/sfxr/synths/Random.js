import Effect from 'sound/sfxr/effects/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

export default function Random (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    fx.tone.frequency = Math.pow(frnd(2) - 1, 2);

    if (rnd(1))
    {
        fx.tone.frequency = Math.pow(frnd(2) - 1, 3) + 0.5;
    }

    fx.tone.limit = 0.0;
    fx.tone.ramp = Math.pow(frnd(2) - 1, 5);

    if (fx.tone.frequency > 0.7 && fx.tone.ramp > 0.2)
    {
        fx.tone.ramp = -fx.tone.ramp;
    }

    if (fx.tone.frequency < 0.2 && fx.tone.ramp < -0.05)
    {
        fx.tone.ramp = -fx.tone.ramp;
    }

    fx.tone.deltaRamp = Math.pow(frnd(2) - 1, 3);
    fx.duty.value = frnd(2) - 1;
    fx.duty.ramp = Math.pow(frnd(2) - 1, 3);
    fx.vibrato.strength = Math.pow(frnd(2) - 1, 3);
    fx.vibrato.speed = frnd(2) - 1;
    fx.envelope.attack = Math.pow(frnd(2) - 1, 3);
    fx.envelope.sustain = Math.pow(frnd(2) - 1, 2);
    fx.envelope.decay = frnd(2) - 1;
    fx.envelope.punch = Math.pow(frnd(0.8), 2);

    if (fx.envelope.attack + fx.envelope.sustain + fx.envelope.decay < 0.2)
    {
        fx.envelope.sustain += 0.2 + frnd(0.3);
        fx.envelope.decay += 0.2 + frnd(0.3);
    }

    fx.lpf.resonance = frnd(2) - 1;
    fx.lpf.frequency = 1 - Math.pow(frnd(1), 3);
    fx.lpf.ramp = Math.pow(frnd(2) - 1, 3);

    if (fx.lpf.freq < 0.1 && fx.lpf.ramp < -0.05)
    {
        fx.lpf.ramp = -fx.lpf.ramp;
    }

    fx.hpf.frequency = Math.pow(frnd(1), 5);
    fx.hpf.ramp = Math.pow(frnd(2) - 1, 5);

    fx.phaser.offset = Math.pow(frnd(2) - 1, 3);
    fx.phaser.ramp = Math.pow(frnd(2) - 1, 3);

    fx.repeat.speed = frnd(2) - 1;

    fx.tonal.speed = frnd(2) - 1;
    fx.tonal.mod = frnd(2) - 1;

    return fx;

}
