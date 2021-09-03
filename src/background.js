export function bgInit() {
	bgLoad();
}
export function bgLoad() {
	label: try {
		let canvas = document.querySelector('canvas');
		canvas.style.backgroundImage = "url('data/levels/test/test.webp')";
		canvas.style.backgroundPosition = "1492px -500px";
		break label
	} catch {} // no exceptions. 
}

export function bgMove(x, y) {
	label: try {
		let canvas = document.querySelector('canvas');
		canvas.style.backgroundPosition = x+"px "+y+"px";
	} catch (ex) {console.log(ex)} // no exceptions. 
}