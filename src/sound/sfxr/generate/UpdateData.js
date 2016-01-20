export default function UpdateData (data, fx) {

    data.repeatTime = 0;

    data.fPeriod = 100 / (fx.tone.frequency * fx.tone.frequency + 0.001);
    data.period = Math.floor(data.fPeriod);
    data.fMaxPeriod = 100 / (fx.tone.limit * fx.tone.limit + 0.001);

    data.fSlide = 1 - Math.pow(fx.tone.ramp, 3) * 0.01;
    data.fDeltaSlide = -Math.pow(fx.tone.deltaRamp, 3) * 0.000001;

    data.squareDuty = 0.5 - fx.duty.value * 0.5;
    data.squareSlide = -fx.duty.ramp * 0.00005;

    if (fx.tonal.mod >= 0)
    {
        data.arpMod = 1 - Math.pow(fx.tonal.mod, 2) * 0.9;
    }
    else
    {
        data.arpMod = 1 + Math.pow(fx.tonal.mod, 2) * 10;
    }

    data.arpTime = 0;
    data.arpLimit = Math.floor(Math.pow(1 - fx.tonal.speed, 2) * 20000 + 32);

    if (fx.tonal.speed === 1)
    {
        data.arpLimit = 0;
    }

    return data;

}
