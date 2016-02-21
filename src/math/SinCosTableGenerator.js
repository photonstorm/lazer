
export default function SinCosTableGenerator (length, sinAmp = 1, cosAmp = 1, frequency = 1) {

    frequency *= Math.PI / length;

    let cos = [];
    let sin = [];

    for (let c = 0; c < length; c++)
    {
        cosAmp -= sinAmp * frequency;
        sinAmp += cosAmp * frequency;

        cos[c] = cosAmp;
        sin[c] = sinAmp;
    }

    return { sin, cos, length };

}
