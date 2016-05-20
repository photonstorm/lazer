// Using Graham Scan to detect if ear is convex
export default function IsEarConvex(ear) {
	let verts = ear.vertices,
		v0 = verts[0],
		v1 = verts[1],
		v2 = verts[2];
		
	return (v1[0] - v0[0]) *
		(v2[1] - v0[1]) -
		(v1[1] - v0[1]) *
		(v2[0] - v0[0]) <= 0;
}