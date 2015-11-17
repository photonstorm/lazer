let quat = Float32Array;

export default function (q, dst = new quat(4)) {

    dst[0] = -q[0];
    dst[1] = -q[1];
    dst[2] = -q[2];
    dst[3] =  q[3];

    return dst;

}
