//   Need to add in a CanvasPool that sets a parent, but that will be one
//   layer up from this

export default function (width = 256, height = 256, id = '') {

    var canvas = document.createElement('canvas');

    if (id !== '')
    {
        canvas.id = id;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.style.display = 'block';

    return canvas;

}
