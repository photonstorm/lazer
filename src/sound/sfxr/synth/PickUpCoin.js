import Effect from 'sound/sfxr/Effect.js';

export default function PickUpCoin () {

    let fx = Effect();

    // result.wave_type = Math.floor(frnd(SHAPES.length));

    // if (result.wave_type === 3) {
    //   result.wave_type = 0;
    // }

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
