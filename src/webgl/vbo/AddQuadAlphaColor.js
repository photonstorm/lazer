//  uvs = UV object
//  a-ty = floats
//  alpha = float
//  colorX = ints

export default function (buffer, uvs, a, b, c, d, tx, ty, alpha = 1.0, color1 = 0xffffff, color2 = 0xffffff, color3 = 0xffffff, color4 = 0xffffff) {

    let v = buffer.vertices;
    let i = buffer.size * 4 * buffer.vertSize;

    //  Top Left vert (xy, uv, color)
    v[i++] = a * w1 + c * h1 + tx;
    v[i++] = d * h1 + b * w1 + ty;
    v[i++] = uvs.x0;
    v[i++] = uvs.y0;
    v[i++] = alpha;
    v[i++] = color1;

    //  Top Right vert (xy, uv, color)
    v[i++] = a * w0 + c * h1 + tx;
    v[i++] = d * h1 + b * w0 + ty;
    v[i++] = uvs.x1;
    v[i++] = uvs.y1;
    v[i++] = alpha;
    v[i++] = color2;

    //  Bottom Right vert (xy, uv, color)
    v[i++] = a * w0 + c * h0 + tx;
    v[i++] = d * h0 + b * w0 + ty;
    v[i++] = uvs.x2;
    v[i++] = uvs.y2;
    v[i++] = alpha;
    v[i++] = color3;

    //  Bottom Left vert (xy, uv, color)
    v[i++] = a * w1 + c * h0 + tx;
    v[i++] = d * h0 + b * w1 + ty;
    v[i++] = uvs.x3;
    v[i++] = uvs.y3;
    v[i++] = alpha;
    v[i++] = color4;

    buffer.size++;

}
