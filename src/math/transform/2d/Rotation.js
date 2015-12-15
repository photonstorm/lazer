
const PI2 = Math.PI * 2;

export default function Rotation (parent, rotation = 0) {

    return {

        parent: parent,

        rotation: rotation,

        fast: rotation % PI2,

        sr: 0,
        cr: 0,

        get () {
            return rotation;
        },

        set (value) {

            if (rotation !== value)
            {
                rotation = value;
                fast = value % PI2;

                if (fast)
                {
                    //  Update the cache if the rotation != 0
                    sr = Math.sin(value);
                    cr = Math.cos(value);
                }

                if (parent.immediate)
                {
                    parent.update();
                }
            }

        }

    };

}
