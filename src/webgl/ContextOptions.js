
export default function WebGLContextOptions ({ alpha = false, antialias = true, premultipliedAlpha = false, stencil = false, preserveDrawingBuffer = false } = {}) {

    return {
        alpha: alpha,
        antialias: antialias,
        premultipliedAlpha: premultipliedAlpha,
        stencil: stencil,
        preserveDrawingBuffer: preserveDrawingBuffer
    }

}
