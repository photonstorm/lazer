//  Based on the given index return the X component

export default function GetX (imageData, index) {

    return Math.floor(index / 4) % imageData.width;

}
