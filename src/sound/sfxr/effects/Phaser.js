
export default function Phaser (
        {
            offset = 0,
            ramp = 0
        } = {}
    ) {

    return {

        offset,    // Phaser offset (SIGNED)
        ramp       // Phaser sweep (SIGNED)

    };
    
}