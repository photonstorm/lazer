export default function (min = 0, max = 255) {

    const r = min + Math.round(Math.random() * (max - min));
    const g = min + Math.round(Math.random() * (max - min));
    const b = min + Math.round(Math.random() * (max - min));

    return { r, g, b };
    
}