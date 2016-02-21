![lazer](http://phaser.io/content/news/2016/01/phaser-in-2015-and-beyond5.png)

# Lazer

This is the development repository for Lazer (previously called Phaser 3).

Lazer is the next generation of the Phaser game framework. Using a completely ES6 base it is renderer agnostic, allowing for DOM, SVG, Canvas and WebGL rendering, across desktop and mobile web browsers.

You can read all about the philosophy behind Lazer [here](http://phaser.io/news/2016/01/phaser-in-2015-and-beyond).

## Mailing List

There is a Google Groups [mailing list](https://groups.google.com/d/forum/phaser3-dev) you can join where progress is posted daily.

You can also follow development on [Twitter](https://twitter.com/lazerjs)

## Examples and Tests

Check out the [Lazer Dev](https://github.com/photonstorm/lazer-dev) repo to get all the code samples and tests.

To set-up a test environment you currently need to do the following:

* Ensure you have a locally running httpd server with php support. There are numerous ways to achieve this, from WAMP Server on Windows to MAMP, Apache or any of the myriad CLI based servers available on OS X and beyond.
* Checkout both the lazer and lazer-dev repos. Ensure they are within the web root of your local server, and at the same level. I.e.:
```
webroot/lazer
webroot/lazer-dev
```
* Visit lazer-dev/index.php in your browser, pick a test and run it.

You **don't** need to `npm install` _anything_ yet, all of the files you need to run tests locally are in the repo already. There is no 'build' step, nothing at all. It's all handled via client-side loaded run-time transpiling and loading.


## Support Lazer on Patreon

![patreon](http://www.phaser.io/images/patreon.png)

Please help support the future development of Lazer through our [Patreon campaign](https://www.patreon.com/photonstorm). We've some exciting plans and there's so much we'd like to do. Let's see if we can all work together to make this possible.

## Warning: Highly Experimental

We have no current estimated date of release.

We are asking for suggestions and feedback in [this forum thread](http://www.html5gamedevs.com/topic/7949-the-phaser-3-wishlist-thread/) so be sure to add your voice.

## License

Phaser is released under the [MIT License](http://opensource.org/licenses/MIT).

## Copyright

![storm](http://www.phaser.io/images/github/photonstorm-x2.png)

Phaser is a [Photon Storm](http://www.photonstorm.com) production.

Created by [Richard Davey](mailto:rich@photonstorm.com). Powered by coffee, anime, pixels and love.

The Lazer logo and characters are &copy; 2016 Photon Storm Limited.

All rights reserved.

"Above all, video games are meant to be just one thing: fun. Fun for everyone." - Satoru Iwata
