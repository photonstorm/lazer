import test from 'ava';
import { expect } from 'chai';
import * as fx from '../../src/fx';

test('FX Library Object Definition', t => {
 	const { plasma } = fx; 
    const { sinusdots } = fx; 
    const { starfield } = fx; 

    expect(plasma.Plasma).to.be.a('function');
    expect(sinusdots.SinusDots).to.be.a('function');
    expect(starfield.Starfield2D).to.be.a('function');
    expect(starfield.Starfield2DDot).to.be.a('function');
    expect(starfield.Starfield2DImage).to.be.a('function');

});