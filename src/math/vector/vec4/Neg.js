let vec4 = Float32Array;

export default function (a, dst = new vec4(4)) {

    dst[0] = -a[0];
    dst[1] = -a[1];
    dst[2] = -a[2];
    dst[3] = -a[3];

    return dst;

}
