import VertexInsideEar from 'geom/earclipping/VertexInsideEar.js'

export default function PolygonInsideEar(vertices, ear) {
	let index = 0,
		length = vertices.length;

	for (index = 0; index < length; ++index) {
		if (VertexInsideEar(vertices[index], ear)) {
			return true;
		}
	}
	return false;
}