import PolygonInsideTriangle from 'geom/earclipping/PolygonInsideTriangle.js'
import IsEarConvex from 'geom/earclipping/IsEarConvex.js'
import Ear from 'geom/earclipping/Ear.js'

// Ear Clipping Triangulation. 
// Most of the info taken from here.
// http://www.geometrictools.com/Documentation/TriangulationByEarClipping.pdf
export default function Triangulate(polygon, initIndex = 0) {
	let currentEar = null,
		index = initIndex,
		vertices = polygon.slice(0),
		length = vertices.length,
		// ear clipping algorithm gives n - 2 ears
		// n being the amount of vertices of the polygon
		ears = new Array(length - 2),
		earIndex = 0,
		iter = 0,
		maxThreshold = length * length,
		failed = false;

	while (vertices.length >= 3) {
		currentEar = Ear(
			vertices[index - 1 < 0 ? length - 1 : index - 1],
			vertices[index],
			vertices[(index + 1) % length]
		);

		if (IsEarConvex(currentEar) &&
			PolygonInsideEar(vertices, currentEar)) {
			ears[earIndex++] = currentEar;
			vertices.splice(index, 1);
			length = vertices.length;
		}
		if (++index >= length) {
			// do a fail check
			if (++iter > maxThreshold) {
				failed = true;
				break;
			}
			index = 0;
		}
		if (failed && initIndex + 1 < polygon.length) {
			// If triangulation failed we go through
			// each vertex as initial point.
			return Triangulate(polygon, initIndex + 1);
		}
		return ears;
	}
}