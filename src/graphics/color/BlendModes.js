/**
* Blends the source color, ignoring the backdrop.
*
* @method Lazer.Color.blendNormal
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function normal (a) {
    return a;
}

/**
* Selects the lighter of the backdrop and source colors.
*
* @method Lazer.Color.blendLighten
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function lighten (a, b) {
    return (b > a) ? b : a;
}

/**
* Selects the darker of the backdrop and source colors.
*
* @method Lazer.Color.blendDarken
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function darken (a, b) {
    return (b > a) ? a : b;
}

/**
* Multiplies the backdrop and source color values.
* The result color is always at least as dark as either of the two constituent
* colors. Multiplying any color with black produces black;
* multiplying with white leaves the original color unchanged.
*
* @method Lazer.Color.blendMultiply
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function multiply (a, b) {
    return (a * b) / 255;
}

/**
* Takes the average of the source and backdrop colors.
*
* @method Lazer.Color.blendAverage
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function average (a, b) {
    return (a + b) / 2;
}

/**
* Adds the source and backdrop colors together and returns the value, up to a maximum of 255.
*
* @method Lazer.Color.blendAdd
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function add (a, b) {
    return Math.min(255, a + b);
}

/**
* Combines the source and backdrop colors and returns their value minus 255.
*
* @method Lazer.Color.blendSubtract
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function subtract (a, b) {
    return Math.max(0, a + b - 255);
}

/**
* Subtracts the darker of the two constituent colors from the lighter.
* 
* Painting with white inverts the backdrop color; painting with black produces no change. 
*
* @method Lazer.Color.blendDifference
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function difference (a, b) {
    return Math.abs(a - b);
}

/**
* Negation blend mode.
*
* @method Lazer.Color.blendNegation
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function negation (a, b) {
    return 255 - Math.abs(255 - a - b);
}

/**
* Multiplies the complements of the backdrop and source color values, then complements the result.
* The result color is always at least as light as either of the two constituent colors. 
* Screening any color with white produces white; screening with black leaves the original color unchanged. 
*
* @method Lazer.Color.blendScreen
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function screen (a, b) {
    return 255 - (((255 - a) * (255 - b)) >> 8);
}

/**
* Produces an effect similar to that of the Difference mode, but lower in contrast. 
* Painting with white inverts the backdrop color; painting with black produces no change. 
*
* @method Lazer.Color.blendExclusion
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function exclusion (a, b) {
    return a + b - 2 * a * b / 255;
}

/**
* Multiplies or screens the colors, depending on the backdrop color.
* Source colors overlay the backdrop while preserving its highlights and shadows. 
* The backdrop color is not replaced, but is mixed with the source color to reflect the lightness or darkness of the backdrop.
*
* @method Lazer.Color.blendOverlay
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function overlay (a, b) {
    return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
}

/**
* Darkens or lightens the colors, depending on the source color value. 
* 
* If the source color is lighter than 0.5, the backdrop is lightened, as if it were dodged; 
* this is useful for adding highlights to a scene. 
* 
* If the source color is darker than 0.5, the backdrop is darkened, as if it were burned in. 
* The degree of lightening or darkening is proportional to the difference between the source color and 0.5; 
* if it is equal to 0.5, the backdrop is unchanged.
* 
* Painting with pure black or white produces a distinctly darker or lighter area, but does not result in pure black or white. 
* The effect is similar to shining a diffused spotlight on the backdrop. 
*
* @method Lazer.Color.blendSoftLight
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function softLight (a, b) {
    return (b < 128) ? (2 * ((a >> 1) + 64)) * (b / 255) : 255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255);
}

/**
* Multiplies or screens the colors, depending on the source color value. 
* 
* If the source color is lighter than 0.5, the backdrop is lightened, as if it were screened; 
* this is useful for adding highlights to a scene. 
* 
* If the source color is darker than 0.5, the backdrop is darkened, as if it were multiplied; 
* this is useful for adding shadows to a scene. 
* 
* The degree of lightening or darkening is proportional to the difference between the source color and 0.5; 
* if it is equal to 0.5, the backdrop is unchanged.
* 
* Painting with pure black or white produces pure black or white. The effect is similar to shining a harsh spotlight on the backdrop. 
*
* @method Lazer.Color.blendHardLight
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function hardLight (a, b) {
    return this.overlay(b, a);
}

/**
* Brightens the backdrop color to reflect the source color. 
* Painting with black produces no change.
*
* @method Lazer.Color.blendColorDodge
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function colorDodge (a, b) {
    return (b === 255) ? b : Math.min(255, ((a << 8) / (255 - b)));
}

/**
* Darkens the backdrop color to reflect the source color.
* Painting with white produces no change. 
*
* @method Lazer.Color.blendColorBurn
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function colorBurn (a, b) {
    return (b === 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b));
}

/**
* An alias for blendAdd, it simply sums the values of the two colors.
*
* @method Lazer.Color.blendLinearDodge
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function linearDodge (a, b) {
    return this.add(a, b);
}

/**
* An alias for blendSubtract, it simply sums the values of the two colors and subtracts 255.
*
* @method Lazer.Color.blendLinearBurn
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function linearBurn (a, b) {
    return this.subtract(a, b);
}

/**
* This blend mode combines Linear Dodge and Linear Burn (rescaled so that neutral colors become middle gray).
* Dodge applies to values of top layer lighter than middle gray, and burn to darker values.
* The calculation simplifies to the sum of bottom layer and twice the top layer, subtract 128. The contrast decreases.
*
* @method Lazer.Color.blendLinearLight
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function linearLight (a, b) {
    return (b < 128) ? this.linearBurn(a, 2 * b) : this.linearDodge(a, (2 * (b - 128)));
}

/**
* This blend mode combines Color Dodge and Color Burn (rescaled so that neutral colors become middle gray).
* Dodge applies when values in the top layer are lighter than middle gray, and burn to darker values.
* The middle gray is the neutral color. When color is lighter than this, this effectively moves the white point of the bottom 
* layer down by twice the difference; when it is darker, the black point is moved up by twice the difference. The perceived contrast increases.
*
* @method Lazer.Color.blendVividLight
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function vividLight (a, b) {
    return (b < 128) ? this.colorBurn(a, 2 * b) : this.colorDodge(a, (2 * (b - 128)));
}

/**
* If the backdrop color (light source) is lighter than 50%, the blendDarken mode is used, and colors lighter than the backdrop color do not change.
* If the backdrop color is darker than 50% gray, colors lighter than the blend color are replaced, and colors darker than the blend color do not change.
*
* @method Lazer.Color.blendPinLight
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function pinLight (a, b) {
    return (b < 128) ? this.darken(a, 2 * b) : this.lighten(a, (2 * (b - 128)));
}

/**
* Runs blendVividLight on the source and backdrop colors.
* If the resulting color is 128 or more, it receives a value of 255; if less than 128, a value of 0.
* Therefore, all blended pixels have red, green, and blue channel values of either 0 or 255.
* This changes all pixels to primary additive colors (red, green, or blue), white, or black.
*
* @method Lazer.Color.blendHardMix
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function hardMix (a, b) {
    return (this.vividLight(a, b) < 128) ? 0 : 255;
}

/**
* Reflect blend mode. This mode is useful when adding shining objects or light zones to images. 
*
* @method Lazer.Color.blendReflect
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function reflect (a, b) {
    return (b === 255) ? b : Math.min(255, (a * a / (255 - b)));
}

/**
* Glow blend mode. This mode is a variation of reflect mode with the source and backdrop colors swapped.
*
* @method Lazer.Color.blendGlow
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function glow (a, b) {
    return this.reflect(b, a);
}

/**
* Phoenix blend mode. This subtracts the lighter color from the darker color, and adds 255, giving a bright result.
*
* @method Lazer.Color.blendPhoenix
* @static
* @param {integer} a - The source color to blend, in the range 1 to 255.
* @param {integer} b - The backdrop color to blend, in the range 1 to 255.
* @returns {integer} The blended color value, in the range 1 to 255.
*/
export function phoenix (a, b) {
    return Math.min(a, b) - Math.max(a, b) + 255;
}
