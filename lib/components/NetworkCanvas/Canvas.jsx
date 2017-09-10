import React from 'react';

class Canvas extends React.Component {
	constructor() {
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.loop = this.loop.bind(this);
		this.state = {
			width: '0',
			height: '0'
		}
	}

	componentWillMount() {
		if (typeof window !== 'undefined') {
			this.updateWindowDimensions();
		}
 	}

 	componentDidMount() {
 		this.ctx = this.canvas.getContext('2d');
 	}

 	updateWindowDimensions() {
 	  this.setState({ width: window.innerWidth, height: window.innerHeight });
 	}

 	loop() {
 		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 		update();
 		draw();
 		requestAnimationFrame(loop);
 	}

	render() {
		return (
			<canvas 
				width={this.state.width} 
				height={this.state.height}
				ref={(el) => {this.canvas = el}}>
			</canvas>
		);
	}
}

export default Canvas;