
export default function Tone (
        {
            frequency = 0.3,
            limit = 0,
            ramp = 0,
            deltaRamp = 0
        } = {}
    ) {

    return {

        frequency,      // Start frequency
        limit,          // Min frequency cutoff
        ramp,           // Slide (SIGNED)
        deltaRamp       // Delta slide (SIGNED)

    };
    
}