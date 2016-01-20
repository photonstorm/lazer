export default function Envelope (fx) {

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
        totalLength: length[0] + length[1] + length[2]
    };

}
