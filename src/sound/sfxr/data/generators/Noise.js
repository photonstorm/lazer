export default function Noise (fx) {

    // Noise
    let buffer = [];

    for (let i = 0; i < 32; ++i)
    {
        buffer[i] = Math.random() * 2 - 1;
    }

    return {
        buffer
    };

}
