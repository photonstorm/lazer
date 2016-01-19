
export default function HighPassFilter (
        {
            frequency = 0,
            ramp = 0
        } = {}
    ) {

    return {

        frequency,  // High-pass filter cutoff
        ramp,       // High-pass filter cutoff sweep (SIGNED)

    };
    
}