import React from 'react';

// via https://codepen.io/jagtalon/pen/rWjrKo

class Parrot extends React.Component {
	constructor() {
		super();

		// 🐦
		const path = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/';
		const parrots = [
			'parrot.gif',
			'gothparrot.gif',
			'sadparrot.gif',
			'ice-cream-parrot.gif',
			'aussiereversecongaparrot.gif',
			'christmasparrot.gif',
			'parrotcop.gif',
			'chillparrot.gif',
			'fiestaparrot.gif',
			'coffeeparrot.gif',
			'pizzaparrot.gif',
			'rightparrot.gif',
			'parrotmustache.gif',
			'partyparrot.gif'
		];

		// Create <img> tags out of the images.
		// Also initialize the x-y coordinates to 0.
		this.state = {
			parrots: parrots
				.concat(parrots)
				.map(parrot => {
					let image = new Image();
					image.src = path + parrot;
					return image;
				})
				.map(parrot => {
					return {
						img: parrot,
						x: 0,
						y: 0,
						opacity: 0
					};
				})
		};
	}

	componentDidMount() {
		this.initCanvas();
	}

	initCanvas() {
		this.context = this.refs.canvas.getContext('2d');
		let context = this.context;
		context.canvas.width = window.innerWidth / 1.3;
		context.canvas.height = window.innerHeight / 1.7;

		// Update the position based on the random number.
		this.state.parrots.forEach(parrot => {
			const [x, y] = [
				this._randNumber(window.innerWidth),
				this._randNumber(window.innerHeight)
			];

			[parrot.x, parrot.y] = [x, y];
		});

		// Wait for the image to load.
		let requests = this.state.parrots.map(parrot => {
			return new Promise(resolve => {
				parrot.img.onload = () => {
					resolve();
				};
			});
		});

		Promise.all(requests).then(() => {
			this.startAnimation();
			this.state.startTime = new Date().getTime();
		});
	}

	// Kick-off requestAnimationFrame
	startAnimation() {
		requestAnimationFrame(this.startAnimation.bind(this));
		this.moveParrots();
	}

	moveParrots() {
		const currentTime = new Date().getTime();

		if (currentTime - this.state.startTime > 5) {
			this.context.clearRect(
				0,
				0,
				this.context.canvas.width,
				this.context.canvas.height
			);

			this.state.parrots.forEach(parrot => {
				parrot.y = parrot.y + 4;
				parrot.opacity = parrot.opacity + 0.01;

				this.context.globalAlpha = parrot.opacity;
				this.context.drawImage(parrot.img, parrot.x, parrot.y);
				this.context.globalAlpha = 1;

				if (parrot.y > this.context.canvas.height) {
					const [x, y] = [
						this._randNumber(window.innerWidth),
						this._randNumber(window.innerHeight / 4)
					];

					[parrot.x, parrot.y, parrot.opacity] = [x, y, 0];
				}
			});

			// Reset the time.
			this.state.startTime = currentTime;
		}
	}

	// Generate a random location for the image.
	_randNumber(max, min = 0) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	render() {
		return <canvas ref="canvas" />;
	}
}

export default Parrot;
