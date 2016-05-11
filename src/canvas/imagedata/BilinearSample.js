//  rgba can be a Float32Array (size 4) or a normal Array

export default function BilinearSample (imageData, x, y, rgba = [0, 0, 0, 0]) {

    let x1 = Math.floor(x);
    let x2 = Math.ceil(x);
    let y1 = Math.floor(y);
    let y2 = Math.ceil(y);

    let a = (x1 + imageData.width * y1) * 4;
    let b = (x2 + imageData.width * y1) * 4;
    let c = (x1 + imageData.width * y2) * 4;
    let d = (x2 + imageData.width * y2) * 4;

    let df = ((x - x1) + (y - y1));
    let cf = ((x2 - x) + (y - y1));
    let bf = ((x - x1) + (y2 - y));
    let af = ((x2 - x) + (y2 - y));

    let rsum = 1 / (af + bf + cf + df);

    af *= rsum;
    bf *= rsum;
    cf *= rsum;
    df *= rsum;

    let data = imageData.data;

    rgba[0] = data[a + 0] * af + data[b + 0] * bf + data[c + 0] * cf + data[d + 0] * df;
    rgba[1] = data[a + 1] * af + data[b + 1] * bf + data[c + 1] * cf + data[d + 1] * df;
    rgba[2] = data[a + 2] * af + data[b + 2] * bf + data[c + 2] * cf + data[d + 2] * df;
    rgba[3] = data[a + 3] * af + data[b + 3] * bf + data[c + 3] * cf + data[d + 3] * df;

    return rgba;

}
