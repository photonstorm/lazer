let vec3 = Float32Array;

export default function (x, y, z, dst = new vec3(3)) {

    dst[0] = x;
    dst[1] = y;
    dst[2] = z;

    return dst;

}
