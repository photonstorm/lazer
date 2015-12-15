let mat = Float32Array;

//  Inverse the src matrix. Output is stored in dst.

export default function Invert (src, dst = new mat(6)) {

    const a = src[0];
    const b = src[1];
    const c = src[2];
    const d = src[3];
    const e = src[4];
    const f = src[5];

    //  determinant
    let det = a * d - b * c;

    if (!det)
    {
        return null;
    }

    //  Method 1

    det = 1 / det;

    dst[0] = d * det;
    dst[1] = -b * det;
    dst[2] = -c * det;
    dst[3] = a * det;
    dst[4] = (c * f - d * e) * det;
    dst[5] = (a * f - b * e) * det;

    //  Method 2

    // dst[0] = d / det;
    // dst[1] = -b / det;
    // dst[2] = -c / det;
    // dst[3] = a / det;
    // dst[4] = (c * f - d * e) / det;
    // dst[5] = -(a * f - b * e) / det;

    // return dst;

}
