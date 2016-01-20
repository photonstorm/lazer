import Effect from 'sound/sfxr/effects/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

export default function LaserShoot (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    if (fx.waveType === SHAPE.NOISE)
    {
        fx.waveType = SHAPE.SQUARE;
    }

    fx.tone.frequency = 0.5 + frnd(0.5);

    fx.tone.limit = fx.tone.frequency - 0.2 - frnd(0.6);

    if (fx.tone.limit < 0.2)
    {
        fx.tone.limit = 0.2;
    }

    fx.tone.ramp = -0.15 - frnd(0.2);

    if (rnd(2) === 0)
    {
        fx.tone.frequency = 0.3 + frnd(0.6);
        fx.tone.limit = frnd(0.1);
        fx.tone.ramp = -0.35 - frnd(0.3);
    }

    if (rnd(1))
    {
        fx.duty.value = frnd(0.5);
        fx.duty.ramp = frnd(0.2);
    }
    else
    {
        fx.duty.value = 0.4 + frnd(0.5);
        fx.duty.ramp = -frnd(0.7);
    }

    fx.envelope.attack = 0;
    fx.envelope.sustain = 0.1 + frnd(0.2);
    fx.envelope.decay = frnd(0.4);

    if (rnd(1))
    {
        fx.envelope.punch = frnd(0.3);
    }

    if (rnd(2) === 0)
    {
        fx.phaser.offset = frnd(0.2);
        fx.phaser.ramp = -frnd(0.2);
    }

    if (rnd(1))
    {
        fx.hpf.frequency = frnd(0.3);
    }

    return fx;

}
