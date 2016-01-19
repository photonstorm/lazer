
export default function SquareDuty (
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