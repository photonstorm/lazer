let vec3 = Float32Array;

export default function BuildXAxis(dst = new vec3(3)) {

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;

    return dst;

}
