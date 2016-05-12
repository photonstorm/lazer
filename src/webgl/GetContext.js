export default function GetContext (canvas, options) {

    return (
        canvas.getContext('webgl', options) || 
        canvas.getContext('experimental-webgl', options) || 
        null
    );

}