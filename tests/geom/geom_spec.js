import test from 'ava';
import { expect } from 'chai';
import * as geom from '../../src/geom';

const {circle, intersect, line, rectangle } = geom;

test('Geom Circle Library Object Definition', t => {
	expect(circle.Area).to.be.a('function');
	expect(circle.Circle).to.be.a('function');
	expect(circle.Circumference).to.be.a('function');
	expect(circle.CircumferencePoint).to.be.a('function');
	expect(circle.Clone).to.be.a('function');
	expect(circle.ContainsXY).to.be.a('function');
	expect(circle.Copy).to.be.a('function');
	expect(circle.Equals).to.be.a('function');
	expect(circle.GetBounds).to.be.a('function');
	expect(circle.Random).to.be.a('function');
	expect(circle.Translate).to.be.a('function');
});

test('Geom intersect Library Object Definition', t => {
	expect(intersect.CircleToCircle).to.be.a('function');
	expect(intersect.CircleToRectangle).to.be.a('function');
	expect(intersect.LineSegmentToLineSegment).to.be.a('function');
	expect(intersect.LineToLine).to.be.a('function');
	expect(intersect.RectangleToRectangle).to.be.a('function');
});

test('Geom Line Library Object Definition', t => {
	expect(line.Angle).to.be.a('function');
	expect(line.BresenhamLine).to.be.a('function');
	expect(line.CenterOn).to.be.a('function');
	expect(line.Clone).to.be.a('function');
	expect(line.Copy).to.be.a('function');
	expect(line.GetMidPoint).to.be.a('function');
	expect(line.Height).to.be.a('function');
	expect(line.Length).to.be.a('function');
	expect(line.Line).to.be.a('function');
	expect(line.NormalAngle).to.be.a('function');
	expect(line.NormalX).to.be.a('function');
	expect(line.NormalY).to.be.a('function');
	expect(line.PerpSlope).to.be.a('function');
	expect(line.PointOnLine).to.be.a('function');
	expect(line.PointOnSegment).to.be.a('function');
	expect(line.Random).to.be.a('function');
	expect(line.Reflect).to.be.a('function');
	expect(line.SetFromAngle).to.be.a('function');
	expect(line.Slope).to.be.a('function');
	expect(line.Width).to.be.a('function');
});

test('Geom Rectangle Library Object Definition', t => {
	expect(rectangle.Area).to.be.a('function');
	expect(rectangle.Ceil).to.be.a('function');
	expect(rectangle.CeilAll).to.be.a('function');
	expect(rectangle.CenterOn).to.be.a('function');
	expect(rectangle.Clone).to.be.a('function');
	expect(rectangle.ContainsRect).to.be.a('function');
	expect(rectangle.ContainsXY).to.be.a('function');
	expect(rectangle.Copy).to.be.a('function');
	expect(rectangle.FitInside).to.be.a('function');
	expect(rectangle.FitOutside).to.be.a('function');
	expect(rectangle.Floor).to.be.a('function');
	expect(rectangle.FloorAll).to.be.a('function');
	expect(rectangle.GetAspectRatio).to.be.a('function');
	expect(rectangle.GetCenter).to.be.a('function');
	expect(rectangle.GetSize).to.be.a('function');
	expect(rectangle.Inflate).to.be.a('function');
	expect(rectangle.MergePoints).to.be.a('function');
	expect(rectangle.MergeRect).to.be.a('function');
	expect(rectangle.MergeXY).to.be.a('function');
	expect(rectangle.Overlaps).to.be.a('function');
	expect(rectangle.Perimeter).to.be.a('function');
	expect(rectangle.Random).to.be.a('function');
	expect(rectangle.Rectangle).to.be.a('function');
	expect(rectangle.Scale).to.be.a('function');
	expect(rectangle.Translate).to.be.a('function');
	expect(rectangle.Union).to.be.a('function');

});