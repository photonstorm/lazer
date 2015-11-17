export default function (canvas, options) {

    return (
        canvas.getContext('2d', options) || 
        null
    );

}