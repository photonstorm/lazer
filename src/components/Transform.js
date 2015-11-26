import Vec2 from 'math/vector/vec3/Vec2.js';

export default class Transform (parent, x, y) {

    this.parent = parent;

    this.position = new Vec2(x, y);
    this.scale = new Vec2(x, y);
    this.rotation = 0;


}
