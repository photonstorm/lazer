
//  Binds Texture data and a Frame together

export default function Texture2D (frame) {

    return {

        frame: frame,

        blendMode: 0,

        crop: { x: frame.x, y: frame.y, width: frame.width, height: frame.height }

    };
    
}