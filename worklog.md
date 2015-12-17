# Lazer Work Log

Richard Davey (rich@photonstorm.com)

I've decided to keep a record of my work on Lazer (previously known as Phaser 3) here in the repo. It can be removed when the project goes live, but will serve as a handy log of what I'm doing and thinking during development.

### TODO

I'll add to this bullet list as I think of things while writing the entries below.

* I need to find a way to allow for non-English error messages in Errors and console warnings.
* I'd like to find a way to allow for non-English jsdocs as well, inline in the code, but not sure how without using some kind of build script (which may not be a bad idea?)
* SetPixel assumes the ImageData is the full canvas and doesn't need offsetting on write.
* SetPixels could record the extend of the dirty rect and optimise the putImageData call as a result.
* An Array Matrix walker could be good (allow you to move around within a matrix, turn, step, etc)
* Array Matrix Resize could be useful too (both up and down)
* A horizontal and vertical convolve function would be very useful for combined filters like Sobel
* Game Config objects (things like PixelArt, Transparent, etc) - can be loaded into the game when it boots, rather than loads of arguments.
* A Transform cache
* Add interpolation to Shape rotation
* Add in the 'no rotation' transform update version
* KeyCombo could have option to ignore control keys (shift, arrows, etc), or limit to specific range
* KeyCombo could allow you to set the combo in any order (not just start to finish)

### 16th December 2015

Sorted out the Transform2DMinimal function. Have created Transform components and moved them to their own folder, as they'll be common between all Transforms. The components can self-inject themselves to the Transform, adding in getters / setters to any target as needed and binding to a parent.

Have modified Shape (canvas shape) to be a function that just exports an object now. When bound with a Transform it renders perfectly still. It makes sense that a Shape on its own wouldn't actually have a Transform, but that you'd create a GameObject that merges the two things together. Will explore this further tomorrow. In essence though we're getting quite close to the way [Stamps](https://github.com/stampit-org/stampit) work, and they may present us with a more unified structure and definition going forward. Will investigate further before making a decision, as Stamps are rather 'custom' and not a widely accepted method. They're also similar to what we're doing already, but I like the thought of using their convention definitions.

### 15th December 2015

**Thought:** Binding a Shape to a Transform on a class level seems like a bad idea (or any object actually). Feels like it would make more sense to build a 'ShapeFactory' that combined a Shape with whatever type of Transform you needed, then you could use more simple or complex ones as required.

For a while now I have wanted to move away from using 'Class' pretty much anywhere in Lazer. I'm not such a religious zealot that I believe it's as bad as lots of JS devs make out, but I do firmly believe that Lazer should be able data structures, not class structures. However until today I had never found a clean way to handle getters and setters on pure Objects. I want you all to be able to do `scale.x++` and similar, and not have to break out into `scale.setX(value)` or something equally nasty. But today I finally found a good clean compromise (that I should have tried weeks ago to be honest). Basically adding the getters and setters onto the returned Object. This way I can have factory functions that spit out well formed Objects that themselves carry the properties and methods needed to just work. This is fantastic on several fronts: it allows you to keep using `scale.x` directly, it allows me to embed property update logic into those setters, and it means I can remove truckloads of 'class' instances from the code base. Win, win.

### 14th December 2015

Monday's are always business admin days, when I usually spend time queuing up news for the Phaser site, answering support email and so on. However in order to move forwards with some areas of Lazer it's important I get a solid, if minimal, transform component nailed very quickly, so that is the focus of my remaining time today.

As a step towards this I've implemented a matrix 2x3 set of functions. Basically a mat33 but refined specifically for 2D use. Element order matches that of the canvas setTransform call. All of the core functions are in: Add, Build, Clone, Copy, Invert, Multiply, Rotate, Scale, Translate and so on.

Could do with a mat23 class that encapsulates all of the core functions into a single object that Transform can use. Need to be careful though as performing matrix operations, even in a baked matrix, can be expensive compared to modifying properties directly (such as position or rotation) and then only calculating the matrix once per loop.

Final work for tonight was getting the Transform2DLite class in a good shape. It will now accurately handle position, scaling, rotation and pivot via a handful of local Vec2 arrays and a single mat23. Have updated the Shape class to use this for now and re-tested the Shape examples and it's looking good. The only thing left it needs is a rotation anchor.

Last minute addition: rotationAnchor added to the Transform2DLite class and supported in the Rectangle Shape. Thinking this may need moving to the Transform class so that the anchor and sub-pixel positioning support is used to derive a render x/y coordinate pair.

Got the Circle rendering again and fixed an issue in Transform2DLite where it would put incorrect shear values into the context. Need to get Shape width / height dimensions based on scale.

### 11th December 2015

Today was spent mostly experimenting with different ways of representing a 2D affine transform in Lazer. Every library appears to have its own way of handling this.

Pixi for example uses a single Pixi Matrix object which isn't touched until the `updateTransform` call and then integrates local Sprite properties such as rotation and position. This works well for Pixi but won't work for 3D content (where rotations should be represented by quaternions rather than floats). 

Other libraries do it differently of course. CAAT for example uses 3 different anchors, one for translation, one for rotation and another for scale. Each CAAT Actor also carries a model view matrix and a world view matrix with it (plus Inversed copies of each). So it's a pretty heavy bundle of properties to say the least, but the flexibility is fantastic as a result.

In Unity literally everything is based on a Transform component, and they have a huge number of properties: local position, rotation, scale and world level versions. As well as local, parent and root transform references and more. Very powerful and equally expensive, except they can get away with it as they compile to native. They of course also are 3D in nature, so quat based rotation objects, vec3s and much larger matrices than 2D libraries need.

After a lot of research it's clear there is no straight winner here. There are benefits to each approach and downsides as well. I think it has shown me that Lazer shouldn't assume to say "use this Transform component and nothing else", because that is clearly not the right approach. Based on this I think it makes a lot of sense to create a few smaller 2D based Transform components: maybe a Pixi compatible one and a more powerful CAAT influenced one. But to also remember that we need to address 3D too, so to avoid generic naming conventions like 'Transform' and instead keep it namespaced away into its own 2d subset.

### 10th December 2015

Added Canvas functions for BeginPath, ClosePath, Save, Restore and Pattern.

Worked a lot on the ShapeFill class, which accompanies a Shape object. You can now stack multiple fills (or strokes) onto a single Shape and they'll be applied in the order specified.

Removed ShapeGradient and renamed it ShapeFill - adding in lots of helper functions to make the one class deal with all varieties of fill (solid, patter, linear and radial). Updated lots of examples to handle the new format too.

### 9th December 2015

KeyCombo can now take its optional settings as a config object, after the Keycodes. Updated one of the examples to use this format.

### 7th December 2015

Fixed the issue in ProcessKeyCombo and now key combos trigger fine even with the `maxKeyDelay` set.

### 6th December 2015

Added in the KeyCombo functions. This lets you define a set of keycodes that match to a 'combo', allowing you to create combos in your game. For example adding the Konami code to your main menu. Combos work by being passed the Keyboard event and then updating an internal pointer to see if it matches the next code in the combo. You can specify a maximum amount of time allowed between each key press (or disable it), and reset the combo should they press an incorrect key.

Created KeyCombo tests. The Processor is working nicely.

### 4th December 2015

Lots of tidying up in the keyboard folder ready for the more advanced functions. Created a 'keys' folder which contains a single function per key, for more friendly Key creation that automatically sets the Key name and code for you. Might seem overkill to split these into single files, but the less space we waste internally the better. This way you can include only those few keys you need.

Moved things like DownDuration to the new 'state' folder and split out the event process functions to their own files (ProcessKeyDown). The process functions no longer retain their own Set but expects one to be provided, making them more generic and less coupled.

### 3rd December 2015

Updated Transform to use Vec2 functions, rather than classes. Cuts down on the number of new objects being created per Transform. Added Transform.draw to handle linear interpolation (needs refining, but mostly works).

Started work on the Keyboard input files as they're going to be needed soon.

Some late night hacking resulted in a nicely refactored set of Keyboard handling functions. Very happy with the end result so far. Have got Keyboard events sorted (KeyDown, KeyUp and KeyPress), a generic Key object (not a class) that you can pass to the functions like JustDown or DownDuration. Also ResetKey and ProcessKeyEvent. You can bind keyboard listeners to any target you want now (window, document, canvas, etc). You can even bind to multiple targets, so you could listen for a certain key on the canvas and then another on the window.

Created several tests to show them in action, including moving a star around the canvas. Feels like it's coming alive :)

There are lots of cool things we can do with the new system which I'll start tomorrow, including Key Combos, multiple callbacks bound to single key codes and text entry. The old Phaser Key objects were updated every single frame, which is overkill, so the new system avoids this.

### 2nd December 2015

Fixed the Mat33.multiply function which was utterly wrong :)

Added the Transform2D class and created lots of tests for it. This is mostly working how I need it to now. It encapsulates position, rotation and scale as you'd expect, with public getters and setters in local space, with a transform matrix with parenting / children for scene graph rendering.

Also added SetTransformFromMatrix and DrawImageFromMatrix.

With a working Transform class I can now create the start of a Sprite class and proper scene graph. Will also add the Transform object to the Canvas Shape class and test that.

### 1st December 2015

Today I did the Canvas Graphics functions. So far I've done: Clear, Fill, FillGradient, FillPattern, Line, LineCap, LineDash, LineJoin, LineWidth, MiterLimit, Stroke, StrokeGradient and StrokePattern.

Have added Canvas Graphics primitives: Arc, Circle and Rectangle. These draw direct to the context with no state saving or restoration, they're pure drawing functions. However I've also added the Shape class, which encapsulates the canvas state saving, translation, rotation and rendering of primitives. Circle and Rectangle both extend Shape and allow for an easy way to blast geometry onto the canvas. More shapes can now follow (star, heart, line, etc) and also Paths for shape masks.

Added LinearGradient and RadialGradient and tests for them. Also added Star shape.

Finally for today added the ShapeGradient class which allows you to link a gradient fill to a Shape object, so you can easily fill lots of different shapes from a single object.

### 27th November 2015

Lots of conceptual work on the Transform component today. Pixi uses a deferred update system for transforms, i.e. changing the local transform of a DisplayObject would not immediately update its world transform (or its children). When the render loop ran the transforms were then calculated for the entire display list, from the root node down in a single iterating `updateTransform` function. The advantage is that you never call this function more than once per DisplayObject. The disadvantage is that whenever you check a DisplayObject property like position, rotation or scale you don't get the actual current values, but instead those from the previous update loop. Or you can force a call to `updateTransform`, losing the O(n) computations you previously had in the process. This is especially problematic in physics and tweening systems. I've lost count of the number of times this has lead to bugs and head-scratching.

It's something I want resolved for Lazer. Out with the deferred updates and in with immediate ones. I believe this will increase stability of the framework as a whole, and your own games. More importantly the renderer shouldn't be responsible for maintaining game object positions, it should literally just dump the textures out at the coordinates and scales given, and no more. So it's time to take back control of this aspect and put it into the right place in the chain.

Also under Lazer there is no longer a Stage object. Things are broken down into Layers, and each Layer is its own root display object. This should help minimize transform iterations.



### 26th November 2015

Today was all about the MainLoop. It's now finally working the way I wanted, including passing interpolation values to the render function, allowing you to smoothly update sprites regardless of actual frame rate. Have tested the MainLoop running under 60, 30 and 10 fps and it interpolates perfectly in all of them. Finally, nice smooth motion, no matter what! (browser glitches aside)

The class is a complete mess and it's not properly hooked into the MasterClock either, but the leg work is done and the test cases look great.

### 25th November 2015

Math - GetPow2 and IsPow2 functions added. Also added Mat33 class and helper functions.

Fixed the WebGLBatchedPointRenderer and the latest test to get things rendering again.

Added some new ImageData filters: FlipHorizontal and FlipVertical will flip the image data.
BilinearSample will sample the pixels around the given x/y coordinate.
CopyImageData will create an ImageData like object with a shallow copy of the data array.
CreateImageData will create a blank ImageData like object.
Distort runs a distortion filter over an ImageData (like a pinch / pull effect)

GetPixels3x3 will take an ImageData and an x/y coordinate and extract and return the color values of the 8 pixels around the given point, plus that pixel. This is typically used in a convolution filter.

With the Convolve function working properly and nicely optimized it was a simple case of cranking out a bunch of ImageData filters including: Blur, EdgeDetect, EdgeDetectDarken, Emboss, EmbossSubtle, Laplace, MeanRemoval and Sharpen.

### 23rd November 2015

Added ReplaceRGB and ReplaceRGBA with tests. Also highlighed a bug in Process Pixels where the dimensions calculations were incorrect. Has made me update Process ImageData to work across the whole imageData object provided, rather than a region of it, which just made more sense.

Added Canvas DrawImage with a new options object, makes for much cleaner client-side code for this function specifically. Added lots of DrawImage tests.

Canvas Shadow is in and working (as well as browsers support it anyway)

### 22nd November 2015

Started work on the Array Utils. So far have done GetRandomElement, RemoveRandomElement, Shuffle and SpliceOne. Included adding String Utils Pad.

Also did the Array Matrix functions: TransposeMatrix, RotateMatrix, ReverseRows, ReverseColumns, MatrixToString, RotateLeft, RotateRight and Rotate180.

Added FindClosestInSorted and renamed to make it more explicit (and provide room to have un-sorted version)

Created a new CheckMatrix function to validate you've actually passed in a proper matrix. RotateMatrix and MatrixToString both now use this check as well.

Added Array RotateLeft and RotateRight to allow you to cycle array elements and created 4 tests. Added new argument 'total' to each which lets you run the rotation multiple times.

Finished final Array Utils: NumberArray and NumberArrayStep.

Removed the bitwise operator ~~ from GetIndex and GetIndexFast. Added GetX, GetY and GetXY to complement GetIndex.

Completed more ImageData functions: ScanTopToBottom, ScanBottomToTop, ScanLeftToRight, ScanRightToLeft and GetFirstPixel. These allow you to scan through an ImageData until it hits a pixel with an alpha value greater than the tolerance provided.

Using the new Scan functions I implemented GetBounds. This will return an object containing the x/y/width/height of the surrounding area of the ImageData based on the alpha tolerance. You can use it to find the bounds of non-transparent pixels on a canvas. Also fixed geom/Rectangle.

### 21st November 2015

SetPixels now takes an ImageData offset for the x,y dirty rect placement. Added Vec2.setTo.

Moved the imageData index look-up to GetIndex and GetIndexFast, the later avoiding the bounds safety checks of the other. Updates GetPixel etc to use this new function.

Finished ProcessPixels and some tests for it. It will take an imageData and a region and pass each pixel to your own callback. The color that comes back from the callback is then set into the imageData. Useful for non-shader image manipulation.

Have split the canvas functions up into more distinct folders. They make more sense now. The 'imagedata' folder now deals specifically with ImageData and doesn't ever write back to the context, where as the 'pixels' folder contains helper functions that encapsulate the context and ImageData side of things together. Also put the Move functions into the new 'effects' folder, and Fill into 'graphics'.

Added Between and FloatBetween to the math functions because they're generally super useful.

Updated all the canvas tests to use the new folder paths.

Added a Grayscale and Invert effect to the effects folder and two tests for them.

Finally for tonight added in Brightness and Threshold effects. Can try a Convolution matrix tomorrow.

### 20th November 2015

SetPixel now does putImageData with a 1x1 pixel direct. SetPixels records the direct rect as new pixels are drawn and uses it when writing.

### 19th November 2015

Added the new RequestAnimationFrame class. As with Phaser it will handle using either RAF or SetTimeout for you. Unlike RAF polyfills it allows you to specifically force it to use SetTimeout (very handy for testing edge cases for legacy devices). Time to hook RAF into the MasterClock.

Wasted hours trying to find the cause of a 500KB Major gc sweep every 2 seconds with nothing but the MasterClock running. After de-constructing every class it turns out that it was the Dev Tools to blame - apparently they inject stack data into the frigging active _JS Heap_ as the Timeline runs! This is insanity but there's nothing we can do about it. So time to put the classes back together again. From this point on I'll take Dev Tools reports with a sizable pinch of salt. It's worrying when the very tool you're using to profile your code is the very reason for the peaks in the timeline.

Added Fill, Resize, GetPixel and GetPixelFromImageData to the canvas functions.

Added GetPixel, GetPixelFromImageData, ImageData, SetPixel and SetPixels to the canvas functions. These allow for pixel level manipulation of a Canvas Contexts ImageData. Am now considering splitting the canvas src folder up and moving pixel level functions to one folder, effects to another and so on, otherwise it could grow quite unwieldy in there over time.

### 17th November 2015

Moved the XML Parser from the Loader into its own file (doesn't need to be part of the base class). Loader returns a Promise for the complete event as well (it has done for a while,  just forgot to write about it). Looking at moving the XHR loader to its own function and then it's time to move onto the master game loop.

Canvas Move, MoveHorizontal and MoveVertical are all done, using a much more efficient pattern method (rather than a swap canvas). Complete tests for all of them including one running off the Master Clock and performance was much better than with a swap canvas.

### 11th November 2015

Today was mostly about tidying up the VertexArrayBuffer and VertexIndexBuffer classes. Also moved the 'add' specific code to its own functions (like AddQuadAlphaColor - a name I'm not set on yet). The Batched texture renderer is coming on nicely.

The GLTexture class is pretty much complete as well. Tomorrow we'll see about hooking that up to the Loader so we can get it populated from image data, then get the renderer spitting out sprites.

Although it feels a little redundant to be doing this, given the amount of work that's gone into the new renderer, it will still serve as an extremely useful renderer template for others. More importantly it is fully featured enough to be a solid test case for all kinds of things, from Textures to Sprites and State handling, as they can all use this renderer during development.

### 10th November 2015

Started fleshing out the batched texture renderer.

### 9th November 2015

Time for some important but menial work: the rest of the vector math classes.

Have split up Vec2 so the more generic functions are pulled to their own files. Reorganised the folder structure as well, so we can bundle common Vector math in one place (like Rotate and RotateAround) and move the VecX specific functions to their own files too, trimming the core class sizes down as a result. Also added in a few additional functions that Three.JS requires.

VecMath3 and VecMath4 are completed. Vec3 is done, but Vec4 still remains.

Quaternions are now finished, along with splitting up all of the Vector and Matrix functions. The final part left to do are some primitives (so you can instantiate a Vec4 for example) but this isn't actually needed for the 3D libs, so I will leave it be for now. This entire math section is ripe for some unit tests.

### 8th November 2015

Created batch point demos 3 and 4. They use 1000 particles (and 4 uses a gravity well) and it's working quite nicely. It's still using a fixed vertex buffer array position though, which really needs to be built dynamically, but at least the systems are all holding up together.

The next task is to use an image based renderer with dynamic vbo and interleaved format.

### 7th November 2015

Fixed the MasterClock getTime function.

Updated VertexArrayBuffer so that the naming conventions for bind and buffer are now correct.

Updated WebGLBatchedPoint as a result and added a basic x position based fragment color. Added in the ability to update buffer index values so we can test basic animation.

Added a length setter to the Vec2 class.

Created a batched point 02 demo which just moves a single point around based on a position and velocity vector. Simple, but proves the batch update is working. The next demo will be to test multiple points.

### 6th November 2015

Added the new WebGL classes Attribute (for working with vertex attributes) and VertexArrayBuffer (for, well have a guess). Updated the batched Point renderer to use them.

### 5th November 2015

Today should really be all about particle fireworks, right? Alas that's not likely, but it's a good incentive to get the batch renderer done.

BaseColor has a new `dirty` flag to stop its (relatively expensive) `update` method from running when it's not needed.

I've also moved all of the common renderer functions out of the 'renderers' folder, because they're more generic than that.

The MinimalRenderer is now a good example of the new set-up and includes AUTO switching support as well.

The PointRenderer is now finished and includes AUTO switching too.

### 4th November 2015

Started work on the common renderer functions and classes, such as WebGLGetContext, ContextOptions, etc. Also built the WebGLMini renderer. All it does is clear the WebGL context with a single color, but it serves another purpose in that it validates the common renderer components at the same time.

Will also create a mini renderer that just draws points, and then progress into textures and batches. The whole point is that there is no one fixed renderer, and you can chop and change at will. So providing some really fundamental 'core' templates will be really useful for both unit testing and allowing devs to create their own renderers (or expand on those provided)

Update: Finished the first pass at the Point renderer. It's working and allowed me to create and test a Program class and the CompileShader function. The next task is to create a Point renderer that uses a Buffer internally to manage multiple points. I will then create a WebGLShader class that allows for uniform attributes. Once the Buffer point renderer and shader classes are done it's an easy step to batched texture rendering.

### 3rd November 2015

The somewhat tedious but vital task of migrating the vmath functions over has begun. Vec2Math.js is finished and now time to start on Vec3Math. Vec2Math assumes an array like object (Float32Array ideally) being passed to all of its functions.

Sadly transpilers cannot let you create a class that extends a native type like Float32Array, so that's out of the question for now. However we can use bracket notation to access numeric properties. Which means Vec2 can have properties [0] and [1] which are effectively its x and y. This means for all the Vec2Math functions you can pass in either a Vec2 object, a Float32Array or an Array and they'll work with all of them, with no internal conditional checks at all.

Also added Math.clamp. Figured it will be useful (especially for things like Vec2 angle calculation).

Vec2 is now done. Need to do tests for it, but it's a good combination of all the key vec2 classes from Phaser 2 and various other libraries. Design wise I've gone for zero method chaining and unrolled code everywhere.

### 2nd November 2015

Time to convert Signals to ES6. I really like Signals as I feel they solve a lot of the issues that normal string based event dispatchers have. However they fail in one key area: You cannot bind a generic listener to a class and be notified about all of the signals it dispatches. You have to bind a listener to a specific signal, a 1:1 mapping. This is something I'm going to address in the rewrite.

The new Signals class uses a Map internally and spread arguments to avoid array slicing all over the place. One issue is that Maps are always iterated in the order in which entries are added. So in order to support Signal priority we may have to re-order the Map each time. I'm not sure how many people ever use Signal priority though (I've never used it once in all these years), so am tempted to remove it.

Added in a new SignalGroup. A class can now create a SignalGroup and assign all of its Signals to it. You can then listen to the SignalGroup itself and any signals in the Group that are dispatched get sent to your handler, without needing to set-up each one specifically.

Thinking about a new 'events' property for base classes. Maybe a custom type of Signal interface that you could listen to:

`aliens.events.addEventListener('DEATH', this.deathHandler);` or
`aliens.events.add('DEATH', this.deathHandler);` or
`aliens.events.listen('DEATH', this.deathHandler);`

and then:

`aliens.dispatch('DEATH', ...arguments);`

Internally the string could be a Map key. The benefit of this approach is that we only need one internal class object. The downside is the iteration through the key handlers.

Update: After asking on twitter and the forum I've decided to remove the PriorityID from Signal. I've also removed the callCount from SignalBinding as I just don't think it's needed. Part of me is tempted to get rid of the binding entirely and wrap it up into a Signal callbacks Map object.

### 1st November 2015

Starting work on the new StateManager.

States will now be persistent and be their own root-level display object containers. Objects added within a state will be added to the States container, not the 'World'. The World will now consist of just multiple layered states.

States will have their own Clock.

You can have as many States running at once as you need.

Also completed lots of work on Geometry, splitting up Rectangle, Line, etc.
