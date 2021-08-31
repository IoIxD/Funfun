import {ballInit} from './ball.js';
import {animate} from './animate.js';
import {ldoInit} from './loadDefaultObjects.js';

export function init() {
	ldoInit();
	ballInit();
	animate();
}