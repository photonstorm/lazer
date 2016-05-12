import Envelope from './Envelope.js';
import Tone from './Tone.js';
import Vibrato from './Vibrato.js';
import Tonal from './Tonal.js';
import SquareDuty from './SquareDuty.js';
import Repeat from './Repeat.js';
import Phaser from './Phaser.js';
import LowPassFilter from './LowPassFilter.js';
import HighPassFilter from './HighPassFilter.js';
import GetShape, * as SHAPE from '../Shapes.js';

export default function Effect (volume = 0.5, sampleRate = 44100, bitDepth = 8) {

    return {

        waveType: SHAPE.SQUARE,

        envelope: Envelope(),
        tone: Tone(),
        vibrato: Vibrato(),
        tonal: Tonal(),
        duty: SquareDuty(),
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