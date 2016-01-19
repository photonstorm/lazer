import Rand from 'sound/sfxr/Rand.js';
import RandFloat from 'sound/sfxr/RandFloat.js';

export default function SoundEffect (length, sampleRate) {

    let context = new AudioContext();
    let buffer = context.createBuffer(1, length, sampleRate);

    return {

        minSampleRate: 22050,

        getBuffer: function() {
            return buffer.getChannelData(0);
        },

        play: function() {

            let source = context.createBufferSource();
            let filter1 = context.createBiquadFilter();
            let filter2 = context.createBiquadFilter();
            let filter3 = context.createBiquadFilter();

            source.buffer = buffer;
            source.connect(filter1);

            filter1.frequency.value = 1600;
            filter2.frequency.value = 1600;
            filter3.frequency.value = 1600;

            filter1.connect(filter2);
            filter2.connect(filter3);
            filter3.connect(context.destination);

            let t = context.currentTime;

            if (source.start)
            {
                source.start(t);
            }
            else
            {
                source.noteOn(t);
            }

        }

    };
    
}