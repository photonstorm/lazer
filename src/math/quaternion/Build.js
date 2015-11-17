let quat = Float32Array;

export default function (x, y, z, w, dst = new quat(4)) {

    dst[0] = x;
    dst[1] = y;
    dst[2] = z;
    dst[3] = w;

    return dst;

}
