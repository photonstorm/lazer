export default function Vibrato (fx) {

    return {
        phase: 0,
        speed: Math.pow(fx.vibrato.speed, 2) * 0.01,
        amp: fx.vibrato.strength * 0.5
    };

}
