import Normalize from 'math/vector/vec3/Normalize.js';
import Length from 'math/vector/vec3/Length.js';
import Dot from 'math/vector/vec3/Dot.js';
import Cross from 'math/vector/vec3/Cross.js';

import Right from 'math/matrix/mat43/Right.js';
import Up from 'math/matrix/mat43/Up.js';
import At from 'math/matrix/mat43/At.js';
import Pos from 'math/matrix/mat43/Pos.js';

let mat = Float32Array;

export default function (m, dst = new mat(12)) {

    const right = Right(m);
    const up = Up(m);
    const at = At(m);
    const pos = Pos(m);

    const innerX = Length(right);
    const innerY = Length(up);
    const innerZ = Length(at);

    Normalize(right, right);
    Normalize(up, up);
    Normalize(at, at);

    let vpU, vpV, vpW;

    if (innerX > 0)
    {
        if (innerY > 0)
        {
            if (innerZ > 0)
            {
                let outerX = Math.abs(Dot(up, at));
                let outerY = Math.abs(Dot(at, right));
                let outerZ = Math.abs(Dot(right, up));

                if (outerX < outerY)
                {
                    if (outerX < outerZ)
                    {
                        vpU = up;
                        vpV = at;
                        vpW = right;
                    }
                    else
                    {
                        vpU = right;
                        vpV = up;
                        vpW = at;
                    }
                }
                else
                {
                    if (outerY < outerZ)
                    {
                        vpU = at;
                        vpV = right;
                        vpW = up;
                    }
                    else
                    {
                        vpU = right;
                        vpV = up;
                        vpW = at;
                    }
                }
            }
            else
            {
                vpU = right;
                vpV = up;
                vpW = at;
            }
        }
        else
        {
            vpU = at;
            vpV = right;
            vpW = up;
        }
    }
    else
    {
        vpU = up;
        vpV = at;
        vpW = right;
    }

    Cross(vpU, vpV, vpW);
    Normalize(vpW, vpW);

    Cross(vpW, vpU, vpV);
    Normalize(vpV, vpV);

    dst[0] = right[0];
    dst[1] = right[1];
    dst[2] = right[2];

    dst[3] = up[0];
    dst[4] = up[1];
    dst[5] = up[2];

    dst[6] = at[0];
    dst[7] = at[1];
    dst[8] = at[2];

    dst[9] = pos[0];
    dst[10] = pos[1];
    dst[11] = pos[2];

    return dst;

}
