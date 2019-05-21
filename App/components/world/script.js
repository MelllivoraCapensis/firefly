class World {
	constructor (wrapper, width, height) {
		this.wrapper = wrapper;
		this.starsNumbers = 1000;
		this.width = width;
		this.height = height;
		this.color = 'black';
		this.spaceObjects = [];

		this.init();
	}

	get coordsInField () {
		return {
			left: this.convertX(0),
			top: this.convertY(this.height)
		}
	}

	init () {
		this.build();
		this.render();
		this.addObjects();
	}

	build () {
		this.field = new Field(this, window.innerWidth,
		    window.innerHeight);

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.width = this.width + 'px';
		this.canvas.style.height = this.height + 'px';
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = this.coordsInField.top + 'px';
		this.canvas.style.left = this.coordsInField.left + 'px';

		this.field.box.appendChild(this.canvas);
		this.field.box.style.position = 'relative';

		this.ctx = this.canvas.getContext('2d');
        
		this.stars = this.getStars(1000);
		
		this.ship = new Ship(this, this.field, 50, 50);

		this.infoBox = document.createElement('div');
		document.body.appendChild(this.infoBox);
		this.infoBox.classList.add('world__infobox');

		this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.width, this.height);

	    this.stars.forEach((star) => {
	    	this.ctx.fillStyle = star.color;
	    	this.ctx.fillRect(star.x, star.y, star.size, star.size);
	  
        })

	}

	addObjects () {
		const timerId = setInterval(() => {
			const y = (this.field.state.y + this.field.height
			    + (this.height - this.field.state.y - this.field.height)
			    * Math.random());
			const x = Math.random() * this.width;
		    
            this.spaceObjects.push(new SpaceObject(this,
            	x, y, {x: 0, y: - 0.5}, 30));
		 }, 400);
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
    	this.canvas.style.left = this.coordsInField.left + 'px';
    	this.canvas.style.top = this.coordsInField.top + 'px';
        this.ship.render();
        this.renderInfoBox();
    }

    renderInfoBox () {
    	this.infoBox.innerHTML = Math.round(this.field.state.x) + ' : '
		    + Math.round(this.field.state.y);
    }

    clear () {
    	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    convertX (x) {
    	return x - this.field.state.x;
    }

    convertY (y) {
    	return this.field.state.y + this.field.height
    	    - y;
    }
}
