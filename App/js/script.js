const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.tabIndex = 0;
window.onresize = (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
const world = new World(canvas, 2000, 10000);

