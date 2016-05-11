let mat = Float32Array;

//  A 2D Transformation Matrix initialized with an identity matrix

//  Follows the canvas transform order:
//  
//  a  c  e
//  b  d  f
//  0  0  1
//  
//  where:
//  
//  a - scale x
//  b - shear y
//  c - shear x
//  d - scale y
//  e - translate x
//  f - translate y
//  
//  And the 3rd row (0, 0, 1) is ignored for speed

export default function Mat23 (a = 1, b = 0, c = 0, d = 1, e = 0, f = 0, dst = new mat(6)) {

    dst[0] = a;
    dst[1] = b;
    dst[2] = c;
    dst[3] = d;
    dst[4] = e;
    dst[5] = f;

    return dst;

}
