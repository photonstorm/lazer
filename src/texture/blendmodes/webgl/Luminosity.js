export default function Luminosity (gl) {

    return {
        type: 16,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
