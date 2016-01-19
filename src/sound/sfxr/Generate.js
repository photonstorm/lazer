import SoundEffect from 'sound/sfxr/SoundEffect.js';

function generateFilter (fx) {

    let w = Math.pow(fx.lpf.frequency, 3) * 0.1;
    let dmp = 5 / (1 + Math.pow(fx.lpf.resonance, 2) * 20) * (0.01 + w);

    if (dmp > 0.8)
    {
        dmp = 0.8;
    }

    return {
        p: 0,
        dp: 0,
        w,
        w_d: 1 + fx.lpf.ramp * 0.0001,
        dmp,
        php: 0,
        hp: Math.pow(fx.hpf.frequency, 2) * 0.1,
        hp_d: 1 + fx.hpf.ramp * 0.0003
    };

}

function generateVibrato (fx) {

    return {
        phase: 0,
        speed: Math.pow(fx.vibrato.speed, 2) * 0.01,
        amp: fx.vibrato.strength * 0.5
    };

}

function generateEnvelope (fx) {

    let length = [
        Math.floor(fx.envelope.attack * fx.envelope.attack * 100000),
        Math.floor(fx.envelope.sustain * fx.envelope.sustain * 100000),
        Math.floor(fx.envelope.decay * fx.envelope.decay * 100000)
    ];

    return {
        vol: 0,
        stage: 0,
        time: 0,
        length,
        total_length: length[0] + length[1] + length[2]
    };

}

function generatePhaser (fx) {

    let fphase = Math.pow(ps.phaser.offset, 2) * 1020;

    if (ps.phaser.offset < 0)
    {
        fphase = -fphase;
    }

    let fdphase = Math.pow(ps.phaser.ramp, 2) * 1;

    if (ps.phaser.ramp < 0)
    {
        fdphase = -fdphase;
    }

    let buffer = [];

    for (var i = 0; i < 1024; i++)
    {
        buffer[i] = 0;
    }

    return {

        phase: 0,
        fphase,
        fdphase,
        iphase: Math.abs(Math.floor(fphase)),
        ipp: 0,
        buffer
    };

}

function generateNoise (fx) {

    // Noise
    let buffer = [];

    for (let i = 0; i < 32; ++i)
    {
        buffer[i] = Math.random() * 2 - 1;
    }

    return {
        buffer
    };

}

export default function Generate (fx) {

    let repeat = function (fx) {

        rep_time = 0;

        fperiod = 100.0 / (ps.p_base_freq * ps.p_base_freq + 0.001);
        period = Math.floor(fperiod);
        fmaxperiod = 100.0 / (ps.p_freq_limit * ps.p_freq_limit + 0.001);

        fslide = 1.0 - Math.pow(ps.p_freq_ramp, 3) * 0.01;
        fdslide = -Math.pow(ps.p_freq_dramp, 3) * 0.000001;

        square_duty = 0.5 - ps.p_duty * 0.5;
        square_slide = -ps.p_duty_ramp * 0.00005;

        if (ps.p_arp_mod >= 0)
        {
            arp_mod = 1.0 - Math.pow(ps.p_arp_mod, 2) * 0.9;
        }
        else
        {
            arp_mod = 1.0 + Math.pow(ps.p_arp_mod, 2) * 10.0;
        }

        arp_time = 0;
        arp_limit = Math.floor(Math.pow(1 - ps.p_arp_speed, 2) * 20000 + 32);

        if (ps.p_arp_speed === 1)
        {
            arp_limit = 0;
        }

    };

    let rep_time = 0;
    let fperiod = 0;
    let period = 0;
    let fmaxperiod = 0;
    let fslide = 0;
    let fdslide = 0;
    let square_duty, square_slide;
    let arp_mod, arp_time, arp_limit;

    repeat();

    let filter = generateFilter(fx);
    let vibrato = generateVibrato(fx);
    let envelope = generateEnvelope(fx);
    let phaser = generatePhaser(fx);
    let noise = generateNoise(fx);



    // Repeat
    var rep_limit = Math.floor(Math.pow(1.0 - ps.p_repeat_speed, 2.0) * 20000 + 32);

    if (ps.p_repeat_speed === 0)
    {
        rep_limit = 0;
    }

    //var gain = 2.0 * Math.log(1 + (Math.E - 1) * ps.sound_vol);
    var gain = 2 * ps.sound_vol;
    var gain = Math.exp(ps.sound_vol) - 1;
    
    var num_clipped = 0;

    // ...end of initialization. Generate samples.

    var sample_sum = 0;
    var num_summed = 0;
    var summands = Math.floor(44100 / ps.sample_rate);

    var buffer_i = 0;
    var buffer_length = Math.ceil(env_total_length / summands);
    var buffer_complete = false;

    var sound;

    if (ps.sample_rate < SoundEffect.MIN_SAMPLE_RATE)
    {
        // Assume 4x gets close enough to MIN_SAMPLE_RATE
        sound = new SoundEffect(4 * buffer_length, SoundEffect.MIN_SAMPLE_RATE);
    }
    else
    {
        sound = new SoundEffect(buffer_length, ps.sample_rate);
    }









}