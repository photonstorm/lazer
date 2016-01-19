import test from 'ava';
import 'babel-core/register';
import Rectangle from '../../../src/geom/rectangle/Rectangle.js'
import Area from '../../../src/geom/rectangle/Area.js'

test('Rectangle.Area', t => {

    let r = Rectangle(0, 0, 100, 64);

    t.plan(1);

    t.is(Area(r), 6400);
    
});
