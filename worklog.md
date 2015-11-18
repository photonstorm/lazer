# Lazer Work Log

Richard Davey (rich@photonstorm.com)

I've decided to keep a record of my work on Lazer (previously known as Phaser 3) here in the repo. It can be removed when the project goes live, but will serve as a handy log of what I'm doing and thinking during development.

### TODO

I'll add to this bullet list as I think of things while writing the entries below.

* I need to find a way to allow for non-English error messages in Errors and console warnings.
* I'd like to find a way to allow for non-English jsdocs as well, inline in the code, but not sure how without using some kind of build script (which may not be a bad idea?)

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
