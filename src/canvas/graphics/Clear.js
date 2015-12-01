/**
* Fills the BitmapData with the given color.
*
* @method Phaser.BitmapData#fill
* @param {number} r - The red color value, between 0 and 0xFF (255).
* @param {number} g - The green color value, between 0 and 0xFF (255).
* @param {number} b - The blue color value, between 0 and 0xFF (255).
* @param {number} [a=1] - The alpha color value, between 0 and 1.
* @return {Phaser.BitmapData} This BitmapData object for method chaining.
*/

export default function Clear (context, fill = false, r = 0, g = 0, b = 0, a = 1) {

    const canvas = context.canvas;

    if (!fill)
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    else
    {
        const oldStyle = context.fillStyle;

        context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = oldStyle;
    }

    return context;
    
}
