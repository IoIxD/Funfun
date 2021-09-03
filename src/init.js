import {ballInit} from './ball.js';
import {animate} from './animate.js';
import {ldoInit} from './loadDefaultObjects.js';
import {bgInit} from './background.js';

export function init() {
	bgInit();
	ldoInit();
	ballInit();
	animate();
}