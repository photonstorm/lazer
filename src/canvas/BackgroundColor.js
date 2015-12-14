//  Sets the backgroundColor property of the canvas CSS style element to the given color string.

export default function BackgroundColor (canvas, color = 'rgb(0, 0, 0)') {

    canvas.style.backgroundColor = color;

    return canvas;

}
