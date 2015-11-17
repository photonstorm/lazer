export default function (element, parent = null, overflowHidden = true) {

    var target;

    if (parent)
    {
        if (typeof parent === 'string')
        {
            // hopefully an element ID
            target = document.getElementById(parent);
        }
        else if (typeof parent === 'object' && parent.nodeType === 1)
        {
            // quick test for a HTMLelement
            target = parent;
        }
    }

    // Fallback, covers an invalid ID and a non HTMLelement object
    if (!target)
    {
        target = document.body;
    }

    if (overflowHidden && target.style)
    {
        target.style.overflow = 'hidden';
    }

    target.appendChild(element);

    return element;

}
