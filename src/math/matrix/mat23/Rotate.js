let mat = Float32Array;

//  Rotates matrix a by rad (radians) and puts result into dst

export default function Rotate (a, rad, dst = new mat(6)) {

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    dst[0] = a[0] * c + a[2] * s;
    dst[1] = a[1] * c + a[3] * s;
    dst[2] = a[0] * -s + a[2] * c;
    dst[3] = a[1] * -s + a[3] * c;
    dst[4] = a[4];
    dst[5] = a[5];

    return dst;

}
