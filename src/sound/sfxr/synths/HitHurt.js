import Effect from '../effects/Effect.js';
import GetShape, * as SHAPE from '../Shapes.js';

export default function HitHurt (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    if (fx.waveType === SHAPE.SQUARE)
    {
        fx.duty.value = frnd(0.6);
    }

    fx.tone.frequency = 0.2 + frnd(0.6);
    fx.tone.ramp = -0.3 - frnd(0.4);
    fx.envelope.attack = 0.0;
    fx.envelope.sustain = frnd(0.1);
    fx.envelope.decay = 0.1 + frnd(0.2);

    if (rnd(1))
    {
        fx.hpf.frequency = frnd(0.3);
    }

    return fx;

}
