import PolygonInsideEar from 'geom/earclipping/PolygonInsideEar.js'
import IsEarConvex from 'geom/earclipping/IsEarConvex.js'
import Ear from 'geom/earclipping/Ear.js'

// Ear Clipping Triangulation. 
// Most of the info taken from here.
// http://www.geometrictools.com/Documentation/TriangulationByEarClipping.pdf
export default function Triangulate(polygon, initIndex = 0) {
	let prev,
		curr,
		next,
		index = initIndex,
		vertices = polygon.slice(0),
		length = vertices.length,
		ears = [],
		iter = 0,
		maxThreshold = length * length,
		failed = false;

	while (length >= 3) {
		prev = vertices[index - 1 < 0 ? length - 1 : index - 1];
		curr = vertices[index];
		next = vertices[(index + 1) % length];
		if (IsEarConvex(curr, prev, next, index, vertices) &&
			!PolygonInsideEar(vertices, prev, curr, next)) {
			ears.push(Ear(prev, curr, next));
			vertices.splice(index, 1);
			length = vertices.length;
		}
		if (++index >= length) {
			if (++iter > maxThreshold) {
				failed = true;
				break;
			}
			index = 0;
		}
	}
	if (failed && initIndex + 1 < polygon.length) {
		// If triangulation failed we go through
		// each vertex as initial point.
		return Triangulate(polygon, initIndex + 1);
	}
	return ears;
}