// Using Graham Scan to detect if ear is convex
export default function IsEarConvex(v0, v1, v2) {
	return (v1[0] - v0[0]) * (v2[1] - v0[1]) - (v1[1] - v0[1]) * (v2[0] - v0[0]) <= 0;
}