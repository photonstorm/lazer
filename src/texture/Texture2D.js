
//  Binds Texture data and a Frame together

export default function Texture2D (frame) {

    return {

        //  Frame object defining the area of the Texture
        frame: frame,

        blendMode: 0,

        //  The actual area that will be used when drawing the Texture
        //  Modifying crop will modify this area, within the bounds of the frame dimensions

        area: { x: frame.x, y: frame.y, width: frame.width, height: frame.height },

        crop: undefined

    };
    
}