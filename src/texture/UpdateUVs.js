//  texture = TextureWebGL object

export default function UpdateUVs (texture) {

    let uvs = texture.uvs;
    let frame = texture.frame;

    uvs.x0 = frame.x / frame.width;
    uvs.y0 = frame.y / frame.height;

    uvs.x1 = (frame.x + frame.width) / frame.width;
    uvs.y1 = frame.y / frame.height;

    uvs.x2 = (frame.x + frame.width) / frame.width;
    uvs.y2 = (frame.y + frame.height) / frame.height;

    uvs.x3 = frame.x / frame.width;
    uvs.y3 = (frame.y + frame.height) / frame.height;

    return texture;

}
