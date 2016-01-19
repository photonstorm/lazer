import Effect from 'sound/sfxr/Effect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

//  rnd = function that takes one argument and returns a random number between 0 and it
//  frnd = function that takes one argument and returns a random number between 0 and X

export default function PickUpCoin (rnd, frnd) {

    let fx = Effect();

    fx.waveType = GetShape(frnd);

    if (fx.waveType === SHAPE.NOISE)
    {
        fx.waveType = SHAPE.SQUARE;
    }

    fx.tone.frequency = 0.4 + frnd(0.5);
    fx.envelope.attack = 0;
    fx.envelope.sustain = frnd(0.1);
    fx.envelope.decay = 0.1 + frnd(0.4);
    fx.envelope.punch = 0.3 + frnd(0.3);

    if (rnd(1))
    {
        fx.tonal.speed = 0.5 + frnd(0.2);

        let num = (frnd(7) | 1) + 1;
        let den = num + (frnd(7) | 1) + 2;

        fx.tonal.mod = num / den;
    }

    return fx;

}
