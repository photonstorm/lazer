export default function UpdateData (data, fx) {

    data.rep_time = 0;

    data.fperiod = 100 / (fx.tone.frequency * fx.tone.frequency + 0.001);
    data.period = Math.floor(data.fperiod);
    data.fmaxperiod = 100 / (fx.tone.limit * fx.tone.limit + 0.001);

    data.fslide = 1 - Math.pow(fx.tone.ramp, 3) * 0.01;
    data.fdslide = -Math.pow(fx.tone.deltaRamp, 3) * 0.000001;

    data.square_duty = 0.5 - fx.duty.value * 0.5;
    data.square_slide = -fx.duty.ramp * 0.00005;

    if (fx.tonal.mod >= 0)
    {
        data.arp_mod = 1 - Math.pow(fx.tonal.mod, 2) * 0.9;
    }
    else
    {
        data.arp_mod = 1 + Math.pow(fx.tonal.mod, 2) * 10;
    }

    data.arp_time = 0;
    data.arp_limit = Math.floor(Math.pow(1 - fx.tonal.speed, 2) * 20000 + 32);

    if (fx.tonal.speed === 1)
    {
        data.arp_limit = 0;
    }

    return data;

}
