class SpaceObject {
	constructor (world, x, y, speed, size) {
        this.speed = speed;
        this.world = world;
        this.field = this.world.field;
        this.width = size;
        this.height = size;
        this.start = {
        	x: x,
        	y: y
        };

        this.state = {
        	move: false,
        	x: x,
        	y: y
        }

        this.init();
	}
    
	init () {
        this.build();
        this.startMove();
	}

	get leftInField () {
		return this.convertX(this.state.x);
	}

	get topInField () {
		return this.convertY(this.state.y);
	}

	set move (value) {
		this.state.move = value;
		if(!this.state.move && this.box.parentElement)
			this.box.parentElement.removeChild(this.box);
	}

	set x (value) {
		let correctValue = Math.max(- this.width, value);
		correctValue = Math.min(correctValue, 
			this.world.width);

		this.state.x = correctValue;
		this.render();

		if(this.state.x <= - this.width || 
			this.state.x >= this.world.width)
			this.move = false;
	}

	set y (value) {
		let correctValue = Math.max(- this.height, value);
		correctValue = Math.min(correctValue, 
			this.world.height);

		this.state.y = correctValue;
		this.render();

		if(this.state.y <= - this.height || 
			this.state.y >= this.world.height)
			this.move = false;
	}

	build () {
        this.box = document.createElement('div');
        this.field.box.appendChild(this.box);
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';   
        this.box.style.top = this.topInField + 'px';
        this.box.style.left = this.leftInField + 'px';
        this.box.style.background = 'green'; 
	}

	startMove () {
		this.move = true;
		const start = performance.now();
		
		const move = (timestamp) => {
			if(!this.state.move)
				return;
			const time = timestamp - start;
            this.x = this.speed.x * time 
                + this.start.x;
            this.y = this.speed.y * time
                + this.start.y;

            requestAnimationFrame(move);
   		}

   		requestAnimationFrame(move);
	}

	render () {
		this.box.style.left = this.leftInField + 'px';
		this.box.style.top = this.topInField + 'px';
	}

	convertX (x) {
        return x - this.field.state.x;
    }

    convertY (y) {
    	return this.field.state.y + this.field.height
    	    - y;
    }
}
