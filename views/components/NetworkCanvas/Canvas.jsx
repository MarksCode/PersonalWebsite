import React from 'react';

const TAU = 2 * Math.PI;

function Ball (startX, startY, startVelX, startVelY) {
    this.x = startX || Math.random() * canvas.width;
    this.y = startY || Math.random() * canvas.height;
    this.vel = {
        x: startVelX || Math.random() * 2 - 1,
        y: startVelY || Math.random() * 2 - 1
    };
    this.update = function(canvas) {
        if (this.x > canvas.width + 50 || this.x < -50) {
            this.vel.x = -this.vel.x;
        }
        if (this.y > canvas.height + 50 || this.y < -50) {
            this.vel.y = -this.vel.y;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
    };
    this.draw = function(ctx, can) {
        ctx.beginPath();
        ctx.globalAlpha = .4;
        ctx.fillStyle = '#448fda';
        ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
        ctx.fill();
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.update = this.update.bind(this);
        this.loop = this.loop.bind(this);
        this.draw = this.draw.bind(this);
        this.lastTime = Date.now();
        this.ctx = null;
        this.balls = [];
        this.state = {
            width: '100%',
            height: '100%'
        }
    }

    componentWillMount() {
        if (typeof window !== 'undefined') {
            this.updateWindowDimensions();
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        this.ctx = this.canvas.getContext('2d');
        for (let i = 0; i < 100; i++) {
            this.balls.push(new Ball(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
        this.loop();
    }

    update() {
        const diff = Date.now() - this.lastTime;
 	  
        for (let frame = 0; frame * 16.6667 < diff; frame++) {
            for (let index = 0; index < this.balls.length; index++) {
                this.balls[index].update(this.canvas);
            }
 	    }
        this.lastTime = Date.now();
    }  

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }

    draw() {
        this.ctx.globalAlpha=1;
        this.ctx.fillStyle = '#001c33';
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        for (let index = 0; index < this.balls.length; index++) {
            let ball = this.balls[index];
            ball.draw(this.ctx, this.canvas);
            this.ctx.beginPath();
            for (let index2 = this.balls.length - 1; index2 > index; index2 += -1) {
                let ball2 = this.balls[index2];
                let dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
                if (dist < 100) {
                    this.ctx.strokeStyle = "#448fda";
                    this.ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 150);
                    this.ctx.lineWidth = "2px";
                    this.ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
                    this.ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
                }
            }
            this.ctx.stroke();
        }
    }

    render() {
        return (
            <div>
                <canvas 
                    width={typeof window !== 'undefined' ? window.innerWidth : 100} 
                    height={typeof window !== 'undefined' ? window.innerHeight : 100}
                    ref={(el) => {this.canvas = el}}>
                </canvas>
            </div>
        );
    }
}

export default Canvas;