
export default function Fill (context, r, g, b, a = 1) {

    context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    context.fill();
    
}
