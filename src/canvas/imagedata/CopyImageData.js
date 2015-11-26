//  Creates an ImageData compatible object (although it won't pass a 'typeof' check)

export default function CopyImageData (imageData) {

    return { 
        width: imageData.width, 
        height: imageData.height, 
        data: new Float32Array(imageData.data.slice())
    };
    
}
