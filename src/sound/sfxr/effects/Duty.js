
export default function Duty (
        {
            duty = 0,
            ramp = 0
        } = {}
    ) {

    return {

        duty,        // Square Duty
        ramp       // Duty Sweep

    };
    
}