import test from 'ava';
import { expect } from 'chai';
import * as cache from '../../src/cache';


const { BaseCache, Cache, CacheEntry, ImageCache, types} = cache;
const { CacheFile, ImageFile } = types;

test('Cache Library Object Definition', t => {
	expect(Cache).to.be.a('function');	
	expect(CacheEntry).to.be.a('function');	
	expect(BaseCache).to.be.a('function');
	expect(ImageCache).to.be.a('function');
	expect(CacheFile).to.be.a('function');
	expect(ImageFile).to.be.a('function');	
});

