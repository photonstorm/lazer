export default function (canvas, value = 'none') {

    canvas.style['-webkit-touch-callout'] = value;
    canvas.style['-webkit-user-select'] = value;
    canvas.style['-khtml-user-select'] = value;
    canvas.style['-moz-user-select'] = value;
    canvas.style['-ms-user-select'] = value;
    canvas.style['user-select'] = value;
    canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';

    return canvas;

}
