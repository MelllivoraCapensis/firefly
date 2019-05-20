class Ship {
	constructor (canvas, world, field, width, height) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.field = field;
        this.world = world;
        this.stepY = 10;
        this.stepX = 10;
        this.speed = {
        	x: 0.5,
            y: 0.5
        };

        this.width = width;
        this.height = height;
        this.color = 'red';

		this.state = {
			x: 300,
			y: 20,
			moveUp: false,
			moveDown: false,
			moveLeft: false,
			moveRight: false
		}

		this.init();
	}

	get coordsInField () {
			return {
				left: this.convertX(this.state.x),
				top: this.convertY(this.state.y + this.height)
			}
	}

	set x (value) {
		this.state.x = value;
		this.field.x = this.state.x - 300;
		this.world.render();
	}

	set y (value) {
		this.state.y = value;
		this.field.y = this.state.y - 20;
		this.world.render();
	}

	init () {
		this.addHandlers();
	}

	addHandlers () {

		this.addArrowUpHandler();
		this.addArrowDownHandler();
		this.addArrowLeftHandler();
		this.addArrowRightHandler();
	}

	addArrowUpHandler () {
		const upHandler = (e) => {
		    if(e.key != 'ArrowUp')
		    	return;
            
		    this.state.moveUp = true;
		    this.canvas.removeEventListener('keydown',
		    	upHandler);

		    this.canvas.addEventListener('keyup', (e) => {
		    	if(e.key == 'ArrowUp')
		    	{
		    		this.state.moveUp = false;
		    		this.canvas.addEventListener('keydown',
		    			upHandler);
		    	}
		    });

            const start = {
            	time: performance.now(),
            	y: this.state.y
            };

		    const move = (timestamp) => {
		    	if(!this.state.moveUp)
		    		return;
		    	const time = timestamp - start.time;
		    	this.y = start.y + this.speed.y
		    	    * time;
		    	requestAnimationFrame(move);
		    }

		    requestAnimationFrame(move);
		}

		this.canvas.addEventListener('keydown', upHandler);
	}

	addArrowDownHandler () {
		const downHandler = (e) => {
		    if(e.key != 'ArrowDown')
		    	return;
            
		    this.state.moveDown = true;
		    this.canvas.removeEventListener('keydown',
		    	downHandler);

		    this.canvas.addEventListener('keyup', (e) => {
		    	if(e.key == 'ArrowDown')
		    	{
		    		this.state.moveDown = false;
		    		this.canvas.addEventListener('keydown',
		    			downHandler);
		    	}
		    });

            const start = {
            	time: performance.now(),
            	y: this.state.y
            };

		    const move = (timestamp) => {
		    	if(!this.state.moveDown)
		    		return;
		    	const time = timestamp - start.time;
		    	this.y = start.y - this.speed.y
		    	    * time;
		    	requestAnimationFrame(move);
		    }

		    requestAnimationFrame(move);
		}

		this.canvas.addEventListener('keydown', downHandler);
	}

	addArrowLeftHandler () {
		const leftHandler = (e) => {
		    if(e.key != 'ArrowLeft')
		    	return;
            
		    this.state.moveLeft = true;
		    this.canvas.removeEventListener('keydown',
		    	leftHandler);

		    this.canvas.addEventListener('keyup', (e) => {
		    	if(e.key == 'ArrowLeft')
		    	{
		    		this.state.moveLeft = false;
		    		this.canvas.addEventListener('keydown',
		    			leftHandler);
		    	}
		    });

            const start = {
            	time: performance.now(),
            	x: this.state.x
            };

		    const move = (timestamp) => {
		    	if(!this.state.moveLeft)
		    		return;
		    	const time = timestamp - start.time;
		    	this.x = start.x - this.speed.x
		    	    * time;
		    	requestAnimationFrame(move);
		    }

		    requestAnimationFrame(move);
		}

		this.canvas.addEventListener('keydown', leftHandler);
	}

	addArrowRightHandler () {
		const rightHandler = (e) => {
		    if(e.key != 'ArrowRight')
		    	return;
            
		    this.state.moveRight = true;
		    this.canvas.removeEventListener('keydown',
		    	rightHandler);

		    this.canvas.addEventListener('keyup', (e) => {
		    	if(e.key == 'ArrowRight')
		    	{
		    		this.state.moveRight = false;
		    		this.canvas.addEventListener('keydown',
		    			rightHandler);
		    	}
		    });

            const start = {
            	time: performance.now(),
            	x: this.state.x
            };

		    const move = (timestamp) => {
		    	if(!this.state.moveRight)
		    		return;
		    	const time = timestamp - start.time;
		    	this.x = start.x + this.speed.x
		    	    * time;
		    	requestAnimationFrame(move);
		    }

		    requestAnimationFrame(move);
		}

		this.canvas.addEventListener('keydown', rightHandler);
	}

			
	render () {
		this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.coordsInField.left,
        	this.coordsInField.top, this.width, 
        	this.height);
	}

	convertX (x) {
    	return x - this.field.state.x;
    }

    convertY (y) {
    	return this.field.state.y + this.canvas.height
    	    - y;
    }
}
