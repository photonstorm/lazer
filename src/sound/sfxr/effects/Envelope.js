
export default function Envelope (
        {
            attack = 0,
            sustain = 0.3,
            punch = 0,
            decay = 0.4
        } = {}
    ) {

    return {

        attack,
        sustain,
        punch,
        decay

    };
    
}