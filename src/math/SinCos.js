
export default function (length, sinAmp = 1.0, cosAmp = 1.0, frequency = 1.0) {

    frequency *= Math.PI / length;

    let cos = [];
    let sin = [];

    for (let c = 0; c < length; c++) {

        cosAmp -= sinAmp * frequency;
        sinAmp += cosAmp * frequency;

        cos[c] = cosAmp;
        sin[c] = sinAmp;

    }

    return { sin, cos, length };

}
