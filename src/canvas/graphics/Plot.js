
export default function Plot (context, x, y, size = 1, color = '#ffffff') {

    const oldStyle = context.fillStyle;

    context.fillStyle = color;

    context.fillRect(x, y, size, size);

    context.fillStyle = oldStyle;

    return context;
    
}
