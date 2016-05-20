export default function IsCCW(polygon) {
	let test = 0,
		length = polygon.length,
		index,
		v0,
		v1;

	for (index = 0; index < length; ++index) {
		v0 = polygon[index];
		v1 = polygon[(index + 1) % length];
		test = test + ((v1[0] - v0[0]) * (v1[1] + v0[1]));
	}
	return test < 0;
}