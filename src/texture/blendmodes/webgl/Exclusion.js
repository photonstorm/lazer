export default function Exclusion (gl) {

    return {
        type: 12,
        mode: [gl.ONE, gl.ONE_MINUS_SRC_ALPHA]
    }

}
