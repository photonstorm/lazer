import VertexInsideEar from 'geom/earclipping/VertexInsideEar.js'

export default function PolygonInsideEar(vertices, v0, v1, v2) {
	let index = 0,
		length = vertices.length;

	for (index = 0; index < length; ++index) {
		if (VertexInsideEar(vertices[index], v0, v1, v2)) {
			return true;
		}
	}
	return false;
}