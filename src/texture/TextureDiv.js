
//  Binds Texture data and a Frame together

export default function TextureDiv (frame, element = undefined) {

    if (!element)
    {
        element = document.createElement('div');
    }

    let style = element.style;

    // style.background = 'url(x.png) no-repeat';
    style.width = frame.width + 'px';
    style.height = frame.height + 'px';
    style.willChange = 'transform';
    style.position = 'absolute';

    return {

        //  The HTML Div element
        element: element,

        //  Frame object defining the area of the Texture
        frame: frame,

        blendMode: 0,

        //  The actual area that will be used when drawing the Texture
        //  Modifying crop will modify this area, within the bounds of the frame dimensions

        x: frame.x, 
        y: frame.y, 
        width: frame.width, 
        height: frame.height,

        crop: undefined

    };
    
}