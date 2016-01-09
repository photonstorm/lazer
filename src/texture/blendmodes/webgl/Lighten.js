export default function Lighten (gl) {

    return {
        type: 6,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
