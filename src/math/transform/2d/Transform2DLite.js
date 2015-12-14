import Vec2 from 'math/vector/vec2/Build.js';

export default class Transform2DLite (parent, x, y) {

    this.parent = parent;

    this.position = Vec2(x, y);
    this.scale = Vec2(1, 1);
    this.rotation = 0;


}
