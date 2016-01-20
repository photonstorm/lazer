import Effect from 'sound/sfxr/effects/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

export default function BlipSelect (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    if (fx.waveType === SHAPE.NOISE)
    {
        fx.waveType = rnd(1);
    }

    if (fx.waveType === SHAPE.SQUARE)
    {
        fx.duty.value = frnd(0.6);
    }

    fx.tone.frequency = 0.2 + frnd(0.4);
    fx.envelope.attack = 0.0;
    fx.envelope.sustain = 0.1 + frnd(0.1);
    fx.envelope.decay = frnd(0.2);
    fx.hpf.frequency = 0.1;

    return fx;

}
