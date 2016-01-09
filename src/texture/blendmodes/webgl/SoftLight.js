export default function SoftLight (gl) {

    return {
        type: 10,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
