import GenerateData from 'sound/sfxr/generate/GenerateData.js';
import UpdateData from 'sound/sfxr/generate/UpdateData.js';
import Envelope from 'sound/sfxr/generate/Envelope.js';
import Filter from 'sound/sfxr/generate/Filter.js';
import Noise from 'sound/sfxr/generate/Noise.js';
import Phaser from 'sound/sfxr/generate/Phaser.js';
import Vibrato from 'sound/sfxr/generate/Vibrato.js';
import Repeat from 'sound/sfxr/generate/Repeat.js';
import SoundEffect from 'sound/sfxr/SoundEffect.js';
import GetShape, * as SHAPE from 'sound/sfxr/Shapes.js';

const MIN_SAMPLE_RATE = 22050;
const SOUND_VOL = 0.25;
const SAMPLE_RATE = 5512;
const BIT_DEPTH = 8;

let masterVolume = 1;

export default function GenerateWebAudio (fx) {

    let data = GenerateData(fx);

    UpdateData(data, fx);

    let filter = Filter(fx);
    let vibrato = Vibrato(fx);
    let envelope = Envelope(fx);
    let phaser = Phaser(fx);
    let noise = Noise(fx);
    let repeat = Repeat(fx);

    // ...end of initialization. Generate samples.

    var sample_sum = 0;
    var num_summed = 0;
    var summands = Math.floor(44100 / fx.sampleRate);

    var buffer_i = 0;
    var buffer_length = Math.ceil(envelope.total_length / summands);
    var buffer_complete = false;

    let sound;

    if (fx.sampleRate < MIN_SAMPLE_RATE)
    {
        // Assume 4x gets close enough to MIN_SAMPLE_RATE
        sound = SoundEffect(4 * buffer_length, MIN_SAMPLE_RATE);
    }
    else
    {
        sound = SoundEffect(buffer_length, fx.sampleRate);
    }

    let buffer = sound.getBuffer();

    for (var t = 0;; ++t)
    {
        // Repeats
        if (repeat.limit !== 0 && ++data.rep_time >= repeat.limit)
        {
            UpdateData(data, fx);
        }

        // Arpeggio (single)
        if (data.arp_limit !== 0 && t >= data.arp_limit)
        {
            data.arp_limit = 0;
            data.fperiod *= data.arp_mod;
        }

        // Frequency slide, and frequency slide slide!
        data.fslide += data.fdslide;
        data.fperiod *= data.fslide;

        if (data.fperiod > data.fmaxperiod)
        {
            data.fperiod = data.fmaxperiod;

            if (fx.tone.limit > 0)
            {
                buffer_complete = true;
            }
        }

        // Vibrato
        var rfperiod = data.fperiod;

        if (vibrato.amp > 0)
        {
            vibrato.phase += vibrato.speed;
            rfperiod = data.fperiod * (1 + Math.sin(vibrato.phase) * vibrato.amp);
        }

        data.period = Math.floor(rfperiod);

        if (data.period < 8)
        {
            data.period = 8;
        }

        data.square_duty += data.square_slide;

        if (data.square_duty < 0)
        {
            data.square_duty = 0;
        }

        if (data.square_duty > 0.5)
        {
            data.square_duty = 0.5;
        }

        // Volume envelope
        envelope.time++;

        if (envelope.time > envelope.length[envelope.stage])
        {
            envelope.time = 0;
            envelope.stage++;

            if (envelope.stage === 3)
            {
                buffer_complete = true;
            }
        }

        if (envelope.stage === 0)
        {
            envelope.vol = envelope.time / envelope.length[0];
        }
        else if (envelope.stage === 1)
        {
            envelope.vol = 1 + Math.pow(1 - envelope.time / envelope.length[1], 1) * 2 * fx.envelope.punch;
        }
        else
        {
            envelope.vol = 1 - envelope.time / envelope.length[2];
        }

        // Phaser step
        phaser.fphase += phaser.fdphase;

        phaser.iphase = Math.abs(Math.floor(phaser.fphase));

        if (phaser.iphase > 1023)
        {
            phaser.iphase = 1023;
        }

        if (filter.hp_d !== 0)
        {
            filter.hp *= filter.hp_d;

            if (filter.hp < 0.00001)
            {
                filter.hp = 0.00001;
            }

            if (filter.hp > 0.1)
            {
                filter.hp = 0.1;
            }
        }

        // 8x supersampling
        var sample = 0;

        for (var si = 0; si < 8; si++)
        {
            var sub_sample = 0;

            phaser.phase++;

            if (phaser.phase >= data.period)
            {
                phaser.phase %= data.period;

                if (fx.waveType === SHAPE.NOISE)
                {
                    for (var i = 0; i < 32; ++i)
                    {
                        noise.buffer[i] = Math.random() * 2 - 1;
                    }
                }
            }

            // Base waveform
            var fp = phaser.phase / data.period;

            if (fx.waveType === SHAPE.SQUARE)
            {
                if (fp < data.square_duty)
                {
                    sub_sample = 0.5;
                }
                else
                {
                    sub_sample = -0.5;
                }
            }
            else if (fx.waveType === SHAPE.SAWTOOTH)
            {
                sub_sample = 1 - fp * 2;
            }
            else if (fx.waveType === SHAPE.SINE)
            {
                sub_sample = Math.sin(fp * 2 * Math.PI);
            }
            else if (fx.waveType === SHAPE.NOISE)
            {
                sub_sample = noise.buffer[Math.floor(phaser.phase * 32 / data.period)];
            }
            else if (fx.waveType === SHAPE.TRIANGLE)
            {
                sub_sample = Math.abs(1 - fp * 2) - 1;
            }
            else if (fx.waveType === SHAPE.BREAKER)
            {
                sub_sample = Math.abs(1 - fp * fp * 2) - 1;
            }
            else
            {
                // throw new Exception('bad wave type! ' + fx.waveType);
            }

            // Low-pass filter
            var pp = filter.p;

            filter.w *= filter.w_d;

            if (filter.w < 0)
            {
                filter.w = 0;
            }

            if (filter.w > 0.1)
            {
                filter.w = 0.1;
            }

            if (fx.lpf.frequency !== 1)
            {
                filter.dp += (sub_sample - filter.p) * filter.w;
                filter.dp -= filter.dp * filter.dmp;
            }
            else
            {
                filter.p = sub_sample;
                filter.dp = 0;
            }

            filter.p += filter.dp;

            // High-pass filter
            filter.php += filter.p - pp;
            filter.php -= filter.php * filter.hp;
            sub_sample = filter.php;

            // Phaser
            phaser.buffer[phaser.ipp & 1023] = sub_sample;
            sub_sample += phaser.buffer[(phaser.ipp - phaser.iphase + 1024) & 1023];
            phaser.ipp = (phaser.ipp + 1) & 1023;

            // final accumulation and envelope application
            sample += sub_sample * envelope.vol;
        }

        // Accumulate samples appropriately for sample rate
        sample_sum += sample;

        if (++num_summed >= summands)
        {
            num_summed = 0;
            sample = sample_sum / summands;
            sample_sum = 0;
        }
        else
        {
            continue;
        }

        sample = sample / 8 * masterVolume;
        sample *= data.gain;

        buffer[buffer_i++] = sample;

        if (fx.sampleRate < MIN_SAMPLE_RATE)
        {
            buffer[buffer_i++] = sample;
            buffer[buffer_i++] = sample;
            buffer[buffer_i++] = sample;
        }

        if (buffer_complete)
        {
            for (; buffer_i < buffer_length; buffer_i++)
            {
                if (fx.sampleRate < MIN_SAMPLE_RATE)
                {
                    buffer[buffer_i++] = 0;
                    buffer[buffer_i++] = 0;
                    buffer[buffer_i++] = 0;
                }

                buffer[buffer_i] = 0;
            }

            break;
        }
    }

    return sound;

}
