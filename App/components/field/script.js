class Field {
	constructor (world, width, height) {
		this.world = world;
		
		this.state = {
			x: 0,
			y: 0
		}

		this.init();
	}

	get width () {
		this.box.style.width = window.innerWidth + 'px';
		return window.innerWidth;
	}

	get height () {
		this.box.style.height = window.innerHeight + 'px';
		return window.innerHeight;
	}

	set y (value) {
		let correctValue = Math.max(0, value);
	        correctValue = Math.min(correctValue, 
	    	this.world.height - this.height);
		this.state.y = correctValue;
	    this.world.render();
	}

	set x (value) {
		let correctValue = Math.max(0, value);
		    correctValue = Math.min(correctValue, 
			this.world.width - this.width);
		this.state.x = correctValue;
		this.world.render();
	}

	init () {
		this.build();
		this.addHandlers();
	}

	build () {
        this.box = document.createElement('div');
        this.world.wrapper.appendChild(this.box);
        this.width;
		this.height;
	}

	addHandlers () {
		window.addEventListener('resize', () => {
			this.updateSize();
		})
	}

	updateSize () {
		this.width;
		this.height;
		this.world.render();
	}


}
