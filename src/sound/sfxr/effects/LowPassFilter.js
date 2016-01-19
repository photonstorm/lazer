
export default function LowPassFilter (
        {
            frequency = 1,
            ramp = 0,
            resonance = 0
        } = {}
    ) {

    return {

        frequency,  // Low-pass filter cutoff
        ramp,       // Low-pass filter cutoff sweep (SIGNED)
        resonance   // Low-pass filter resonance

    };
    
}