export default function Multiply (gl) {

    return {
        type: 2,
        mode: [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA]
    }

}
