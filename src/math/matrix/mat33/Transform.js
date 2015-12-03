//  m = mat33 like object
//  angle is in radians

export default function Transform (m, rotationDirection, x = 0, y = 0, angle = 0, scaleX = 1, scaleY = 1) {

    let c = Math.cos(angle);
    let s = Math.sin(angle) * rotationDirection;

    m[0] = c * scaleX;
    m[1] = -s * scaleY;
    m[2] = 0;
    m[3] = s * scaleX;
    m[4] = c * scaleY;
    m[5] = 0;
    m[6] = x;
    m[7] = y;
    m[8] = 1;

    return m;

}
