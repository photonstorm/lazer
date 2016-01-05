export default function SetTransformToCSS (transform, element) {

    if (transform.dirty)
    {
        transform.updateTransform();
    }

    let t = transform.local;
    let ax = transform.rotationAnchor.x * 100;
    let ay = transform.rotationAnchor.y * 100;

    element.style['transform-origin'] = `${ax}% ${ay}% 0px`;
    element.style.transform = `matrix(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})`;

}
