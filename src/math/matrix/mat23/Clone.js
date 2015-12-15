let mat = Float32Array;

//  Create new mat with values cloned from src

export default function Clone (src) {

    let dst = new mat(6);

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    dst[4] = src[4];
    dst[5] = src[5];

    return dst;

}
