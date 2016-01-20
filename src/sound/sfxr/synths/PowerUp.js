import Effect from 'sound/sfxr/effects/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

export default function PowerUp (rnd, frnd) {

    let fx = Effect();

    if (rnd(1))
    {
        fx.waveType = SHAPE.SAWTOOTH;
    }
    else
    {
        fx.duty.value = frnd(0.6);
    }

    fx.waveType = GetShape(frnd);

    if (fx.wave_type === 3)
    {
        fx.wave_type = SHAPE.SQUARE;
    }

    if (rnd(1))
    {
        fx.tone.frequency = 0.2 + frnd(0.3);
        fx.tone.ramp = 0.1 + frnd(0.4);
        fx.repeat.speed = 0.4 + frnd(0.4);
    }
    else
    {
        fx.tone.frequency = 0.2 + frnd(0.3);
        fx.tone.ramp = 0.05 + frnd(0.2);

        if (rnd(1))
        {
            fx.vibrato.strength = frnd(0.7);
            fx.vibrato.speed = frnd(0.6);
        }
    }

    fx.envelope.attack = 0.0;
    fx.envelope.sustain = frnd(0.4);
    fx.envelope.decay = 0.1 + frnd(0.4);

    return fx;

}
