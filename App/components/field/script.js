class Field {
	constructor (world) {
		this.world = world;


		this.state = {
			x: 0,
			y: 0
		}
	}

	set y (value) {
		this.state.y = value;
	    this.world.render();
	}

	set x (value) {
		this.state.x = value;
		this.world.render();
	}
}
