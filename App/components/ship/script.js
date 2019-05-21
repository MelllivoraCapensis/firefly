class Ship {
	constructor (world, field, width, height) {
        this.field = field;
        this.world = world;
        this.speed = {
        	x: 0.5,
            y: 0.5
        };

        this.width = width;
        this.height = height;
        this.color = 'red';
       
        this.position = {
        	x: 500,
        	y: 50
        }

		this.state = {
			x: 0,
			y: 0,
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
		let correctValue = Math.max(0, value);
		correctValue = Math.min(correctValue, 
			this.world.width - this.width);
		this.state.x = correctValue;
		this.field.x = this.state.x - this.position.x;
		this.world.render();
	}

	set y (value) {
		let correctValue = Math.max(0, value);
		correctValue = Math.min(correctValue, 
			this.world.height - this.height);
		this.state.y = correctValue;
		this.field.y = this.state.y - this.position.y;
		this.world.render();
	}

	init () {
        this.build();
		this.addHandlers();
		this.state.x = this.position.x;
		this.state.y = this.position.y;
	}

	build () {
		this.canvas = document.createElement('canvas');
		this.field.box.appendChild(this.canvas);
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = 0;
		this.canvas.style.left = 0; 
		this.canvas.width = this.field.width;
		this.canvas.height = this.field.height;
		this.canvas.tabIndex = 0;

        this.ctx = this.canvas.getContext('2d');
	}

	addHandlers () {

		this.addArrowUpHandler();
		this.addArrowDownHandler();
		this.addArrowLeftHandler();
		this.addArrowRightHandler();
		this.addResizeHandler();
	}

	addResizeHandler () {
		window.addEventListener('resize', () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.render();
		})
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
		this.clear();
		this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.coordsInField.left,
        	this.coordsInField.top, this.width, 
        	this.height);
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
