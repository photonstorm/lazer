import Envelope from 'sound/sfxr/effects/Envelope.js';
import Tone from 'sound/sfxr/effects/Tone.js';
import Vibrato from 'sound/sfxr/effects/Vibrato.js';
import Tonal from 'sound/sfxr/effects/Tonal.js';
import Duty from 'sound/sfxr/effects/Duty.js';
import Repeat from 'sound/sfxr/effects/Repeat.js';
import Phaser from 'sound/sfxr/effects/Phaser.js';
import LowPassFilter from 'sound/sfxr/effects/LowPassFilter.js';
import HighPassFilter from 'sound/sfxr/effects/HighPassFilter.js';

//  consts

const SQUARE = 0;

export default function Effect (volume = 0.5, sampleRate = 44100, bitDepth = 8) {

    return {

        waveType: SQUARE;

        envelope: Envelope(),
        tone: Tone(),
        vibrato: Vibrato(),
        tonal: Tonal(),
        duty: Duty(),
        repeat: Repeat(),
        phaser: Phaser(),
        lpf: LowPassFilter(),
        hpf: HighPassFilter(),

        // Sample parameters
        volume,
        sampleRate,
        bitDepth

    };
    
}