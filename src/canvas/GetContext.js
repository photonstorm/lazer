export default function GetContext (canvas, options) {

    return (
        canvas.getContext('2d', options) || 
        null
    );

}
