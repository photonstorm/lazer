//  texture = TextureWebGL object

export default function UpdateUVs (texture) {

    let frame = texture.frame;

    texture.uvs.x0 = frame.x / frame.width;
    texture.uvs.y0 = frame.y / frame.height;

    texture.uvs.x1 = (frame.x + frame.width) / frame.width;
    texture.uvs.y1 = frame.y / frame.height;

    texture.uvs.x2 = (frame.x + frame.width) / frame.width;
    texture.uvs.y2 = (frame.y + frame.height) / frame.height;

    texture.uvs.x3 = frame.x / frame.width;
    texture.uvs.y3 = (frame.y + frame.height) / frame.height;

    return texture;

}
