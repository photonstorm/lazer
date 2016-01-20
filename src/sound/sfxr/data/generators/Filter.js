export default function Filter (fx) {

    let w = Math.pow(fx.lpf.frequency, 3) * 0.1;
    let dmp = 5 / (1 + Math.pow(fx.lpf.resonance, 2) * 20) * (0.01 + w);

    if (dmp > 0.8)
    {
        dmp = 0.8;
    }

    return {
        p: 0,
        dp: 0,
        w,
        wd: 1 + fx.lpf.ramp * 0.0001,
        dmp,
        php: 0,
        hp: Math.pow(fx.hpf.frequency, 2) * 0.1,
        hpd: 1 + fx.hpf.ramp * 0.0003
    };

}
