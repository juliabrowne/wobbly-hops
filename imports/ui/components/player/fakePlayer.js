import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.velocityY = 3;
    this.velocityX = 3;
    this.positionX = 100;
    this.positionY = 0;
    this.direction = {};
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    this.ball;
  }
  componentDidMount() {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    window.onresize = e => {
      this.setState({
        screen: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    };
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    setInterval(
      () => (window.requestAnimationFrame(() => this.drawGame()), 16)
    );
  }
  move = () => {
    if ("ArrowRight" in this.direction) {
      if (this.positionX >= this.canvas.width) {
        this.positionX = 0;
      }
      this.positionX += this.velocityX;
    }
    if ("ArrowLeft" in this.direction) {
      if (this.positionX <= 0) {
        this.positionX = this.canvas.width;
      }
      this.positionX -= this.velocityX;
    }
  };
  drawGameBoard = () => {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  drawPlayer = () => {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.positionX, this.positionY, 50, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  };
  drawGame = () => {
    this.drawGameBoard();
    this.drawPlayer();
    this.move();
    this.gravity();
  };
  gravity = () => {
    if (this.positionY >= this.canvas.height - 30) {
      this.velocityY = this.velocityY * -1;
      setTimeout(() => {
        this.velocityY = this.velocityY * -1;
      }, 750);
    }
    this.positionY += this.velocityY;
  };
  render() {
    return (
      <div>
        <canvas
          id="canvas"
          ref={this.canvasRef}
          width={this.state.screen.width}
          height={this.state.screen.height}
        />
      </div>
    );
  }
}

export default App;
