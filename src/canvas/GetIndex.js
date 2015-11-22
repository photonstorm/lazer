

export default function GetIndex (imageData, x, y) {

    x = Math.abs(Math.round(x));
    y = Math.abs(Math.round(y));

    if (x <= imageData.width && y <= imageData.height)
    {
        return (~~(x + (y * imageData.width))) * 4;
    }

}