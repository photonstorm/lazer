
export default function FlipHorizontal (imageData) {

    let temp = new Float32Array(imageData.data.slice());

    let w = imageData.width;
    let h = imageData.height;

    for (let y = 0; y < h; y++)
    {
        for (let x = 0; x < w; x++)
        {
            let index = (y * w + x) * 4;
            let dest = (y * w + (w - x - 1)) * 4;

            imageData.data[dest] = temp[index];
            imageData.data[dest + 1] = temp[index + 1];
            imageData.data[dest + 2] = temp[index + 2];
            imageData.data[dest + 3] = temp[index + 3];
        }
    }

}
