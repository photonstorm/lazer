import UpdateUVs from './UpdateUVs.js';

//  Binds Texture data and a Frame together

export default function TextureWebGL (frame) {

    let texture = {

        //  Frame object defining the area of the Texture
        frame: frame,

        blendMode: 0,

        //  The actual area that will be used when drawing the Texture
        //  Modifying crop will modify this area, within the bounds of the frame dimensions

        x: frame.x, 
        y: frame.y, 
        width: frame.width, 
        height: frame.height,

        crop: undefined,

        //  The quad UV data
        uvs: { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }

    };

    return UpdateUVs(texture);
    
}