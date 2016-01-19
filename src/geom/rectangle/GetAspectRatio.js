export default function GetAspectRatio (rect) {

    return (rect.height === 0) ? NaN : rect.width / rect.height;
    
}