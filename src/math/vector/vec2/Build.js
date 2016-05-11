let vec2 = Float32Array;

export default function Build(x, y, dst = new vec2(2)) {

    dst[0] = x;
    dst[1] = y;

    return dst;

}
