import Effect from 'sound/sfxr/Effect.js';

export default function Explosion (rnd, frnd) {

    let fx = Effect();

    if (rnd(1))
    {
        fx.tone.frequency = 0.1 + frnd(0.4);
        fx.tone.ramp = -0.1 + frnd(0.4);
    }
    else
    {
        fx.tone.frequency = 0.2 + frnd(0.7);
        fx.tone.ramp = -0.2 - frnd(0.2);
    }

    fx.tone.frequency *= fx.tone.frequency;

    if (rnd(4) === 0)
    {
        fx.tone.ramp = 0;
    }

    if (rnd(2) === 0)
    {
        fx.repeat.speed = 0.3 + frnd(0.5);
    }

    fx.envelope.attack = 0;
    fx.envelope.sustain = 0.1 + frnd(0.3);
    fx.envelope.decay = frnd(0.5);

    if (rnd(1) === 0)
    {
        fx.phaser.offset = -0.3 + frnd(0.9);
        fx.phaser.ramp = -frnd(0.3);
    }

    fx.envelope.punch = 0.2 + frnd(0.6);

    if (rnd(1))
    {
        fx.vibrato.strength = frnd(0.7);
        fx.vibrato.speed = frnd(0.6);
    }

    if (rnd(2) === 0)
    {
        fx.tonal.speed = 0.6 + frnd(0.3);
        fx.tonal.mod = 0.8 - frnd(1.6);
    }

    return fx;

}
