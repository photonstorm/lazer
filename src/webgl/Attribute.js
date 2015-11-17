function create (gl, program, name, size, type, normalized, stride, offset) {

    const loc = getLocation(gl, program, name);

    if (loc !== null)
    {
        gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);

        gl.enableVertexAttribArray(loc);
    }

    return loc;

}

export function disable (gl, location) {

    gl.disableVertexAttribArray(location);

}

export function getLocation (gl, program, name) {

    const loc = gl.getAttribLocation(program, name);

    if (loc < 0)
    {
        console.warn('WebGLProgram - failed to get attribute location: ' + name);
        return null;
    }
    else
    {
        return loc;
    }

}

export function createByte (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.UNSIGNED_BYTE, normalized, stride, offset);

}

export function createShort (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.SHORT, normalized, stride, offset);

}

export function createUnsignedShort (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.UNSIGNED_SHORT, normalized, stride, offset);

}

export function createInt (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.INT, normalized, stride, offset);

}

export function createUnsignedInt (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.UNSIGNED_INT, normalized, stride, offset);

}

export function createFloat (gl, program, name, normalized = false, stride = 0, offset = 0) {

    return create(gl, program, name, 2, gl.FLOAT, normalized, stride, offset);

}
