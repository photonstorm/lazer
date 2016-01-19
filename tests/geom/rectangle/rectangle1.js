import test from 'ava';
import 'babel-core/register';
import Rectangle from '../../../src/geom/rectangle/Rectangle.js'

test('Rectangle', t => {

    let r = Rectangle(100, 200, 32, 64);

    t.plan(6);
    t.is(r.x, 100);
    t.is(r.y, 200);
    t.is(r.width, 32);
    t.is(r.height, 64);
    t.is(r.right, 132);
    t.is(r.bottom, 264);
    
});

test('Rectangle.setPosition', t => {

    let r = Rectangle(0, 0, 32, 32);

    r.setPosition(100, 200);

    t.plan(2);
    t.is(r.x, 100);
    t.is(r.y, 200);
    
});

test('Rectangle.setSize', t => {

    let r = Rectangle(0, 0, 32, 32);

    r.setSize(256, 128);

    t.plan(2);
    t.is(r.width, 256);
    t.is(r.height, 128);
    
});
