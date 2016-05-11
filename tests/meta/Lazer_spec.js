import test from 'ava';

import { Lazer, Version } from '../../src';


test('Lazer Meta Data Definition', t => {    
	const testLazer = {    
		AUTO: 0,
    	CANVAS: 1,
    	WEBGL: 2,
    	HEADLESS: 3
	};

	t.deepEqual(Lazer, testLazer);

});

const testVersion = {
    major: 1,
    minor: 2,
    point: 3,
    build: 1,
    date: '12th January 2016'
};


test('Version', t => {
	t.deepEqual(Version, testVersion)
});