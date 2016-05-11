import test from 'ava';
import { expect } from 'chai';
import * as canvas from '../../src/canvas';

test('Canvas Library Object Definition', t => {

	expect(canvas.BackgroundColor).to.be.a('function');
	expect(canvas.Canvas).to.be.a('function');	
	expect(canvas.DrawImage).to.be.a('function');	
	expect(canvas.DrawImageFromMatrix).to.be.a('function');
	expect(canvas.GetContext).to.be.a('function');
	expect(canvas.ImageRendering.crisp).to.be.a('function');
	expect(canvas.ImageRendering.bicubic).to.be.a('function');
	expect(canvas.ResetTransform).to.be.a('function');
	expect(canvas.Resize).to.be.a('function');
	expect(canvas.SetTransform).to.be.a('function');
	expect(canvas.SetTransformFromMatrix).to.be.a('function');
	expect(canvas.Smoothing.set).to.be.a('function');
	expect(canvas.Smoothing.enable).to.be.a('function');
	expect(canvas.Smoothing.disable).to.be.a('function');
	expect(canvas.Smoothing.getPrefix).to.be.a('function');
	expect(canvas.Smoothing.isEnabled).to.be.a('function');
	expect(canvas.TouchAction).to.be.a('function');
	expect(canvas.UserSelect).to.be.a('function');
	expect(canvas.effects.Brightness).to.be.a('function');
})

test('Canvas Effects Libary Object Definition', t => {
	const { effects } = canvas;

	expect(effects.Brightness).to.be.a('function');
	expect(effects.Grayscale).to.be.a('function');
	expect(effects.Invert).to.be.a('function');
	expect(effects.Luminance).to.be.a('function');
	expect(effects.Move).to.be.a('function');
	expect(effects.MoveHorizontal).to.be.a('function');
	expect(effects.MoveVertical).to.be.a('function');
	expect(effects.ReplaceRGB).to.be.a('function');
	expect(effects.ReplaceRGBA).to.be.a('function');
	expect(effects.Threshold).to.be.a('function');

})

test('Canvas Filters Libary Object Definition', t => {
	const { filters } = canvas;

	expect(filters.Blur).to.be.a('function');
	expect(filters.Convolve).to.be.a('function');	
	expect(filters.Distort).to.be.a('function');
	expect(filters.EdgeDetect).to.be.a('function');
	expect(filters.EdgeDetectDark).to.be.a('function');
	expect(filters.Emboss).to.be.a('function');
	expect(filters.EmbossSubtle).to.be.a('function');
	expect(filters.FlipHorizontal).to.be.a('function');
	expect(filters.FlipVertical).to.be.a('function');
	expect(filters.Laplace).to.be.a('function');
	expect(filters.MeanRemoval).to.be.a('function');
	expect(filters.Sharpen).to.be.a('function');
})

test('Canvas Graphics Libary Object Definition', t => {
	const { graphics } = canvas;

	expect(graphics.Arc).to.be.a('function');
	expect(graphics.BeginPath).to.be.a('function');
	expect(graphics.Circle).to.be.a('function');
	expect(graphics.ClosePath).to.be.a('function');
	expect(graphics.Fill).to.be.a('function');
	expect(graphics.FillGradient).to.be.a('function');
	expect(graphics.FillPattern).to.be.a('function');
	expect(graphics.Gradient).to.be.a('function');
	expect(graphics.LinearGradient).to.be.a('function');
	expect(graphics.LineCap).to.be.a('function');
	expect(graphics.LineDash).to.be.a('function');
	expect(graphics.LineJoin).to.be.a('function');
	expect(graphics.LineStyle).to.be.a('function');
	expect(graphics.LineWidth).to.be.a('function');
	expect(graphics.MiterLimit).to.be.a('function');
	expect(graphics.Pattern).to.be.a('function');
	expect(graphics.Plot).to.be.a('function');
	expect(graphics.RadialGradient).to.be.a('function');
	expect(graphics.Rectangle).to.be.a('function');
	expect(graphics.Save).to.be.a('function');
	expect(graphics.Shadow).to.be.a('function');
	expect(graphics.Stroke).to.be.a('function');
	expect(graphics.StrokeGradient).to.be.a('function');
	expect(graphics.StrokePattern).to.be.a('function');
})

test('Canvas ImageData Libary Object Definition', t => {
	const { imagedata } = canvas;

	expect(imagedata.BilinearSample).to.be.a('function');
	expect(imagedata.CopyImageData).to.be.a('function');
	expect(imagedata.CreateImageData).to.be.a('function');
	expect(imagedata.GetBounds).to.be.a('function');
	expect(imagedata.GetFirstPixel).to.be.a('function');
	expect(imagedata.GetImageData).to.be.a('function');
	expect(imagedata.GetIndex).to.be.a('function');
	expect(imagedata.GetIndexFast).to.be.a('function');
	expect(imagedata.GetPixel).to.be.a('function');
	expect(imagedata.GetPixels3x3).to.be.a('function');
	expect(imagedata.GetX).to.be.a('function');
	expect(imagedata.GetY).to.be.a('function');
	expect(imagedata.Process).to.be.a('function');
	expect(imagedata.PutImageData).to.be.a('function');
	expect(imagedata.ScanBottomToTop).to.be.a('function');
	expect(imagedata.ScanLeftToRight).to.be.a('function');
	expect(imagedata.ScanRightToLeft).to.be.a('function');
	expect(imagedata.ScanTopToBottom).to.be.a('function');
	expect(imagedata.SetPixel).to.be.a('function');
})

test('Canvas Pixels Libary Object Definition', t => {
	const { pixels } = canvas;

	expect(pixels.GetPixel).to.be.a('function');
	expect(pixels.PixelData).to.be.a('function');
	expect(pixels.Process).to.be.a('function');
	expect(pixels.SetPixel).to.be.a('function');
	expect(pixels.SetPixels.load).to.be.a('function');
	expect(pixels.SetPixels.set).to.be.a('function');
	expect(pixels.SetPixels.write).to.be.a('function');
})

test('Canvas Shapes Libary Object Definition', t => {
	const { shapes } = canvas;

	expect(shapes.Circle).to.be.a('function');
	expect(shapes.Rectangle).to.be.a('function');
	expect(shapes.Shape).to.be.a('function');
	expect(shapes.ShapeFill).to.be.a('function');
	expect(shapes.ShapeGradient).to.be.a('function');
	expect(shapes.ShapeStroke).to.be.a('function');
	expect(shapes.Star).to.be.a('function');
})
