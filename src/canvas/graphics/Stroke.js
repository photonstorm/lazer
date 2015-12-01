
export default function Stroke (context, r, g, b, a = 1) {

    context.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    context.stroke();
    
}
