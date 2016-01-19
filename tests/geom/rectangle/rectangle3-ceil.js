import test from 'ava';
import 'babel-core/register';
import Rectangle from '../../../src/geom/rectangle/Rectangle.js'
import Ceil from '../../../src/geom/rectangle/Ceil.js'

test('Rectangle.Ceil', t => {

    let r = Rectangle(34.2, 39.8, 1, 1);

    Ceil(r);

    t.plan(2);

    t.is(r.x, 35);
    t.is(r.y, 40);
    
});
