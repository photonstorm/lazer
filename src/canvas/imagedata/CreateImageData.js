//  Creates an ImageData compatible object (although it won't pass a 'typeof' check)

export default function CreateImageData (width, height) {

    return { width: width, height: height, data: new Float32Array(width * height * 4) };
    
}
