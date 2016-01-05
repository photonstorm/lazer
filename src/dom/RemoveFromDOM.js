export default function RemoveFromDOM (element) {

    if (element.parentNode)
    {
        element.parentNode.removeChild(element);
    }

}
