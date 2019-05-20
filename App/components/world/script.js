class World {
	constructor (canvas, width, height) {
		this.starsNumbers = 1000;
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.color = 'black';
		this.ctx = this.canvas.getContext('2d');

		this.init();
	}

	get coordsInField () {
		return {
			left: this.convertX(0),
			top: this.convertY(this.height)
		}
	}

	init () {
		this.stars = this.getStars(1000);
		this.field = new Field(this);
		this.ship = new Ship(this.canvas, this,
			this.field, 50, 50);
		this.render();
	}

	getStars (number) {
		const arr = [];
		for(let i = 0; i < number; i ++)
		{
			arr.push(
			{
				x: Math.round(Math.random() * this.width),
				y: Math.round(Math.random() * this.height),
				color: 'white',
				size: 5
			});
		}
		return arr;
    }

    render () {
    	this.clear();
    	this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.coordsInField.left,
        	this.coordsInField.top, this.width, this.height);

        this.stars.forEach((star) => {
        	this.ctx.fillStyle = star.color;
        	this.ctx.fillRect(this.convertX(star.x), 
        		this.convertY(star.y), star.size, star.size);
        })

        this.ship.render();
    }

    clear () {
    	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    convertX (x) {
    	return x - this.field.state.x;
    }

    convertY (y) {
    	return this.field.state.y + this.canvas.height
    	    - y;
    }
}
