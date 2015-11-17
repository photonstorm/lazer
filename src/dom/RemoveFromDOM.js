export default function (element) {

    if (element.parentNode)
    {
        element.parentNode.removeChild(element);
    }

}
