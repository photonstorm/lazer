import Effect from 'sound/sfxr/effects/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

export default function PushSound (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    if (fx.waveType === 2)
    {
        fx.waveType++;
    }

    if (fx.waveType === 0)
    {
        fx.waveType = SHAPE.NOISE;
    }

    fx.tone.frequency = 0.1 + frnd(0.4);
    fx.tone.ramp = 0.05 + frnd(0.2);

    fx.envelope.attack = 0.01 + frnd(0.09);
    fx.envelope.sustain = 0.01 + frnd(0.09);
    fx.envelope.decay = 0.01 + frnd(0.09);

    fx.repeat.speed = 0.3 + frnd(0.5);
    fx.phaser.offset = -0.3 + frnd(0.9);
    fx.phaser.ramp = -frnd(0.3);
    fx.tonal.speed = 0.6 + frnd(0.3);
    fx.tonal.mod = 0.8 - frnd(1.6);

    return fx;

}
