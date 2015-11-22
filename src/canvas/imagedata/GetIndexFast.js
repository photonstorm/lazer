//  Safe for when you are absolutely sure that the x and y
//  values are absolute integers and within the bounds
//  of the imageData

export default function GetIndexFast (imageData, x, y) {

    return (~~(x + (y * imageData.width))) * 4;

}