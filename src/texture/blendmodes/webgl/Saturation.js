export default function Saturation (gl) {

    return {
        type: 14,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
