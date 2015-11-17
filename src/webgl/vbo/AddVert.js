//  Add a single vert set into the Vertex Buffer

export default function (buffer, x, y) {

    buffer.vertices[buffer.index++] = x;
    buffer.vertices[buffer.index++] = y;

    buffer.total++;

    //  return the starting index of the point
    return buffer.index - 2;

}
