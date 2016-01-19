# Lazer Work Log

Richard Davey (rich@photonstorm.com)

I've decided to keep a record of my work on Lazer (previously known as Phaser 3) here in the repo. It can be removed when the project goes live, but will serve as a handy log of what I'm doing and thinking during development.

## Phaser Port Progress

* Animation Manager
* Animations
* Bone support: Creature
* Frame and Frame Data
* Camera
* Create
    * Dynamic Textures
    * Grid
    * Palettes
* Filters
* FlexGrid / FlexLayer
* Group
* Plugin and Plugin Manager
* Scale Manager
* Signals
* State Manager + States
* Game World
* Game Objects
    * BitmapData
    * BitmapText
    * Button
    * Graphics
    * Image
    * Particle
    * RenderTexture
    * RetroFont
    * Rope
    * Sprite
    * Text
    * Layer
    * TileSprite
    * Video
* Geometry
    * Circle
    * Ellipse
    * Line
    * Point
    * Polygon
    * Rectangle
    * Rounded Rectangle
* Input
    * Keyboard
    * Mouse
    * MSPointer
    * Touch
    * Gamepad
* Loader
* Math
    * QuadTree
    * Random Data Generator
* Particles
    * Arcade Particles
* Physics
    * Arcade Physics
    * Ninja Physics
    * P2 Physics
* Sound
    * Sound Manager
    * Sound
    * Audio Sprite
    * Dynamic Audio
    * SFXR
* System
    * Canvas
    * Device
    * DOM
    * RAF
* Tilemap
    * Tilemap
    * Tilemap Layer
    * Tiled Parser
    * Tileset
    * Tile
    * Image Collection
* Time
    * Master Clock
    * Clock
    * Timer
    * Timed Events
* Tweens
    * Tween Manager
    * Tweens
    * Easing
    * Custom Eases
    * GSAP Bindings
* Utils
    * Array Set
    * Array Utils
    * String Utils
    * Color
    * Debug
    * Linked List


### Misc. TODO

I'll add to this bullet list as I think of things while writing the entries below.

* I need to find a way to allow for non-English error messages in Errors and console warnings.
* I'd like to find a way to allow for non-English jsdocs as well, inline in the code, but not sure how without using some kind of build script (which may not be a bad idea?)
* SetPixel assumes the ImageData is the full canvas and doesn't need offsetting on write.
* SetPixels could record the extend of the dirty rect and optimise the putImageData call as a result.
* An Array Matrix walker could be good (allow you to move around within a matrix, turn, step, etc)
* Array Matrix Resize could be useful too (both up and down)
* A horizontal and vertical convolve function would be very useful for combined filters like Sobel
* A Transform cache
* Add interpolation to Shape rotation
* KeyCombo could have option to ignore control keys (shift, arrows, etc), or limit to specific range
* KeyCombo could allow you to set the combo in any order (not just start to finish)
* The MultiFile and File relationship is slightly wrong, it should be a chained Promise and not store a reference to the resolve / reject functions, but instead return Promise.resolve.

### 18th January 2016

Ported over the Circle class and broke it down into a nicer and much smaller plain object, plus supporting functions such as Circumference, Clone, ContainsXY, Equals, Random and Translate.

Wrote tests for all of the functions and managed to optimize several of them in the process.

Trying to decide what to do with the geometry intersection functions, they could either live in geom/intersects or in the actual shape folders, such as geom/circle/intersects/.

Started working on porting SFXR. Have created the base Effect object, along with all of its modifiers: Duty, Envelope, HighPassFilter, LowPassFilter, Phaser, Repeat, Tonal, Tone and Vibrato. Also created one synth (PickUpCoin).

### 14th January 2016

`Loader.getLoadedFilesByType` is a new method that allows you to get all of the loaded files of a specific type. All of the Loader file types have had new consts added to make them more secure. You can now for example do `getLoadedFilesByType(ImageFile.TYPE)` to get just the loaded images. There is an optional `group` argument as well.

The Cache has been recoded to be a pure object, rather than a class.

The Nano Game has been updated to include a default State, a working main loop and has the loader hooked up.

Added an Image parser to the Texture Frame Parsers. This will create a Frame object for a single image (needed by the Cache). Made the ImageFile loader set the image key as its `name` property. This property exists natively on the Image objects and is unset, so we may as well use it.

### 13th January 2016

Today I got the Game Configuration Loader working. Instead of using a butt-load of constructor arguments (or a giant config object) like in Phaser:

`var game = Game(800, 600, 'canvas', '', { preload: preload, create: create, update: update });`

You can now use the new Config function:

```
let config = Config(
    Parent('game'),
    GameTitle('BobVaders')
);

let game = new Game(config);
```

The Config handler allows different ways of specifying the settings. It can be one-by-one:

```
let config = Config();

config.add(Dimensions(800, 600));
config.add(Transparent(true));
config.add(DOMParent('lazer-example'));
```

Or it can be via spread arguments:

```
let config = Config(
    Dimensions(800, 600),
    Transparent(true),
    DOMParent('lazer-example'),
);
```

Or you can mix them both. The Game itself can tell the Config loader which settings it requires, and what those default values should be. But if you have provided them it will use your settings instead.

So far I've created settings for:

* Game Dimensions
* FrameRate
* Game Title and URL
* Parent DOM Element
* Transparent
* Pixel Art Scale Mode
* Disable WebGL (for debugging)
* Disable Audio (for debugging)
* Disable WebAudio (for debugging)

I've also created game/nano/Game.js which is the start of porting over the functionality from Phaser Nano to Lazer.

Finally I created state/State.js which is the new base template State object. Tomorrow I'll tackle the State Manager, and get all kinds of fun State things happening (like parallel states, State render priority, etc)

### 12th January 2016

Created utils/Banner.js to handle the console.log output for Lazer. You can pass in your own game title, in which case it outputs `game powered by Lazer`. Or you can just not call it at all, and it won't output anything. Made two tests to accompany.

Updated Version.js to export properly without requiring a `Lazer` global.

Created dom/Boot.js to handle DOM content loading. The function returns a Promise allowing you to react to the eventual dom event.

Added in default textures: blank 32x32 PNG and missing image one from Phaser. You can now easily add your own, or just not include them at all.

### 11th January 2016

Created the Texture2D and TextureWebGL functions, that generate Lazer Texture objects from the given Frame data. Also added UpdateUVs function.

### 9th January 2016

Added in all of the Canvas and WebGL Blend Modes and left it open so it's easy for you to add your own (or tweak single blend modes yourself, without effecting the rest of Lazer)

### 7th January 2016

A few more refinements to the Loader. Updated it so that files can now load themselves entirely, without the need for the BaseLoader at all. You are responsible for processing them when you do this, but it still means you can literally just create an ImageFile and call `load` on it and it'll just work.

Created a new XHRSettings object, which the Loader and File share. Created some xhr test cases.

MultiFile support is now added. This is a special file type that consists of two separate files. For example the AtlasJSONFile is a MultiFile that contains a JSONFile and an ImageFile. When MultiFiles are added to the BaseLoader the Promise is only sent once both files are loaded successfully (or rejected if just one of them fails). They are also linked by the linkFile property, so further processing knows how to combine them together again i.e. for adding to the Cache.

Updated the File onStateChange so it doesn't resolve the Promise until the file is loaded AND parsed, otherwise you just get loads of incomplete data if you use a file-level Promise. The Promise will reject if the file fails loading OR parsing.

TexturePackerJSONArray is working and extracting the right data from the atlas.

--

Added a new feature to the BaseLoader: `startFileGroup`. This allows you to tag files as being in a specific group. You can then filter the group with `BaseLoader.getLoadedFiles(tag)`. The group tags are non-unique strings. It means you could tag a set of files as being used for the 'MainMenu', and then get just the MainMenu files from the Loader when it has completed, for further caching.

Fixed a bug in the BaseLoader where the queue size wasn't being properly checked against the maxDownloads. Am now using an inflight Set which will only ever be the size of maxDownloads. Once a file loads it is moved to the queue Set ready for processing (or to the failed Set if it failed). At the end once all files are loaded and processed they are put into the Storage Set and the remaining sets are cleared out. You can then process the storage Set as needed.




### 6th January 2016

Complete rewrite of the Loader. The Files are now entirely independent of the Loader and don't hold any references to the Loader at all. They are fully Promise based. The BaseLoader no longer cares about what the File is or does, as long as it exposes the properties and methods it needs. The File is responsible for handling its own loading (be it XHR or Tag based) and simply returns a Promise to the Loader.

The Files are no longer Classes either, but pure JavaScript objects with a few helper functions.

Lots of new XHR level properties have been added to the files and the Loader. You can now set XHR login credentials (username, password), a file-specific timeout value, request headers and mime type overrides. These can all be set on a per-file basis, or globally in the Loader itself (file level properties override global ones always)

Image Files have a new crossOrigin property, as does the Loader. So files can have their own CORs settings, not just a Loader level one.

Files also now have a process callback, which is invoked after the default File Handler process function has run. The Loader now works differently to Phaser - before once the file was loaded it was instantly processed. For example if you loaded a huge JSON it would be parsed immediately on load, even while other files were loading. This is a performance issue, so the Loader now works in two stages: Loading of files and Processing of them. Only once all the files have loaded are they processed (i.e. JSON is parsed, XML is evaluated, etc).

---

More work on Textures and Frame handling. Have created some new Texture Packer parsers (will add in Starling and some others later). Frame is a nice generic object. FrameSet is a collection of Frame objects.

Pixi works on the basis of a BaseTexture which contains just the source image and a few other settings (including a FrameData collection), then it uses a Texture for each Sprite, which can have custom crop etc applied without messing with the underlying Frame objects. This is a quite nice approach although I can't help but feel we could simplify things a little.

Thought: Convert Frame to SpriteSheet (FrameSet?) / Parse Frame - that is how we'll allow you to embed a sprite sheet into an atlas and still create animation data from it.

Thought: I need to find a way to define an Animation with either indexes or frame names (like currently), but that can span multiple images. Maybe an Animation just contains _references_ to Frame objects, and it doesn't matter what cache they are in: How to tell if texture needs updating? Don't, just set currentFrame and handle it then.

Thought: Frames are part of a FrameData set, but what I'm wondering now is why? What benefit does that provide? My thought is 'frame name lookup'. Should there be 1 FrameData per atlas? (and thus 1 per single image too), or just one massive FrameCache, split into 'cache names', then FrameData per name?

Needed outcome: Ability to just pass a Texture to a renderer, not a Sprite. Therefore Texture needs to know about the source image + crop rect + frame + uv data + blend mode.

### 5th January 2016

Created a transform/2d/basic folder and moved relevant files in there. This will help distinguish it from other more complex 2D Transforms (i.e. those with parenting support).

Updated BaseTransformComponent so it now uses local [0][1] properties (like the Vec2 class does) instead of the _v property data array. This means you can now pass any Transform component such as Position or Scale to _any_ function that expects a Vec2 data type. This makes it extremely flexible.

Created BaseTransform class, which can be used by a Game Object as a base class to extend from. It hides away the Transform methods you don't want to inherit and adds in some useful property accessors.

Moved the setTransform method out into the `SetTransformToContext` function. Also created `SetTransformToCSS` along with a new test (06-css1.js) and it works great, happily rendering 50 <div> elements, rotating and translating them across a container 'game' div, all from the same base Transform class as used for Canvas (and soon WebGL).

Created new Transform sets: Minimal, Basic and Standard. These relate to the number of components they have enabled, and thus their complexity within their update functions. Minimal just has the Position and Scale components, nothing else, so is the quickest of them all. Basic has Rotation and RotationAnchor support added, so is the next most complex. Standard adds Pivot support onto this, which is really useful but adds another layer of complexity to the update logic. The final set to create will be ones allowing for child transforms. I'm likely going to create several of those - again ranging in complexity the more calculations are needed.

Have created lots of test cases showing the new Transforms in action, very happy with how quickly this is coming together. Will soon be able

Big update to the Lazer-Dev Test Runner. It now looks lovely and is much easier to use. It's based on the Phaser one I use locally and includes the ability to run tests in a div or iframe, screen grab and other things. It runs from php, just because, but should work fine on any set-up.

Time to start thinking about Texture support, starting with how Frames and FrameData will be represented internally. Made a start by creating the Frame function along with SetTrim. Also created a massive multipack + rotation texture atlas in the lazer-dev repo to test from. This is going to need a new way to handle things from Phaser. Probably `Sprite.frameSet`, `Sprite.frameName` (the name of the frame within the atlas) and `Sprite.frame` (the number of the frame within the frameName, if a Sprite Sheet, or within frameSet).

### 4th January 2016

Added the preRender and postRender callbacks to Create.RenderToCanvas. To be honest this function name probably needs changing (RenderSpriteData?) but I'm not really sure to what.

The rest of my time today was spent playing with how to handle Transform properties on Game Objects. It's quite an interesting problem, with many different ways to address it (it's just a case of finding the right one).

What I want is for you to be able to do things like this:

```
sprite.x = 100;
sprite.scale.y = 2;
sprite.rotation = 0.34;
```

... and for it to update the Game Object AND it's children immediately, rather than having a deferred update like Phaser/Pixi has. However I also want these things wrapped up in a single Transform object (position, scale, rotation, pivot and so on). The problem is that I don't really want each element to be an instance of a Vec2 class. However I still want you to be able to set and get the values directly as in the code above.

With a deferred transform this is easy - you just let the user manipulate those values as much as they like, and it's not until the render pass that you bake them into the transform. But for reasons discussed earlier this isn't a good way of doing it, which means I need the setter for `scale.x` for example to notify the parent Transform that a change has happened.

I could create an Observable Vec2, which notifies its parent on change. Alternatively I could create Transform components (Position, Scale and so on) but this means having Vec2 instances for each component. One single Transform would then end up with a staggering 8 objects _and_ a Matrix23. That's a lot of objects for a single transform, especially if you consider you may have thousands of Sprites in your game (each with their own transforms).

Alternatively I could have a single Transform class that doesn't create any Vec2 instances, but instead just creates Vec2 data arrays and manages property access itself: `Transform.getPositionX` for example, as a function, not a getter. Then you'd have `sprite.transform` and a whole host of methods available to manipulate it. This is quite a step away from Phaser though, and breaks my 'friendly API' rule.

So I've been experimenting with Object.defineProperties and think this could end-up working out well. So each Transform component (Position, Scale and so on) has this function:

```
addProperties (target, element) {

    target[element] = {};

    Object.defineProperties(target[element], {

        'x': {
            enumerable: true,
            get: () => this.getX(),
            set: (value) => this.setX(value)
        },

        'y': {
            enumerable: true,
            get: () => this.getY(),
            set: (value) => this.setY(value)
        }

    });

}
```

Which allows me to do: `bob.transform.addProperties(bob);` and then all of a sudden the `bob` object will have `x` and `y` getters and setters, which route through to the Position component automatically. Using this same approach I could do the same for `bob.scale` and so on. The difference between this and how Phaser works is that all of the components will actually be part of the single Transform instance, but you'll still be able to interface with them via `sprite.scale.y` and so on. It also means I don't have to create masses of Vec2 instances and so on just for a single Transform. The down-side is that it will change the object shape of `bob`, but right now I'm not sure how much that will matter in the real-world.

Update: 22:55

Have moved the Math constants to Constants.js and now reference those in various functions instead (such as PI2).

Have refactored all of the Transform components into classes with local value arrays. Given how many Transforms are likely to exist in any given game (typically thousands) it's important they are built on the prototype, and don't carry around all kinds of duplicate functions. Also updated 2d/Transform to use them and built lots of tests for it, and it's all working well. You can inject the transform properties into any object, allowing for my `sprite.x` use-case. You can also use Transform as a base class to extend from, rather than having it as an object property, and it'll work just fine without the need for property injection.

The tests are running nicely, so the next move will be to take the Transform class I've got and add in child transform support.

### 3rd January 2016

Managed to get a few hours to port over the Grid function from the Phaser Create class. This has been expanded lots. You can now specify alternate grid colors, drawLines and even pre and post render callbacks. Much more flexible :) Created lots of test cases to show it in use. There is one bug remaining: the drawLines function overlaps the final column.

### 2nd January 2016

Updated RenderToCanvas to take a configuration object instead of parameters. This has allowed me to specify a default palette (Arne16), set the pixelWidth from a single property and also add in the resizeCanvas and clear boolean options. Previously this would have needed 6 arguments alone, but a single config object makes more sense for a function like this, where it's highly unlikely to ever be called 'in anger'. Also updated all the tests to use the new format. As today is the weekend that's likely to be all I do for now.

### 1st January 2016

Being a public holiday I'm not expecting to get much done today, maybe just an hours coding. As I'm limited on time I'm going to port over some small quick parts of Phaser.

I decided to do the 'Create' class from Phaser. So I've ported over the 5 palettes it used, into their own files. I've also recoded the 'texture' method into `RenderToCanvas`. This now lets you render sprite data to either the provided canvas, or let it create one for you. You can feed in any palette, of any size, and it's now using parseInt to handle the look-up, making the palettes more compact and generic in the process (being plain arrays now). Not bad for a bank holiday :)

### 29th December 2015

My Christmas Holidays are over and work resumes. The priority right now is working out the composition structure. Getting this right is fundamental as it has far reaching consequences through-out the entire code base. A wrong move here could cripple Lazer for a long time.

### 17th December 2015

Today I tested out StampIt and the Entity Composer. I think of the two the Composer is going to be the most useful, combined with a "traditional" ES6 Class approach where needed. I will endeavor to stick to pure functions where possible, but when it comes to performance I'm still not yet convinced that composition wins. So I'll have to pick my battles carefully here.

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
