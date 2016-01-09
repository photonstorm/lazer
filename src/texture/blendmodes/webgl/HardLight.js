export default function HardLight (gl) {

    return {
        type: 9,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
