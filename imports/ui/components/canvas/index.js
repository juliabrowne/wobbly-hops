import React from "react";
import "./styles.css";
import Paddle from "../paddle";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
  }

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext("2d");
    // this.generatePaddles();
    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
    console.log(this.canvasRef.current.width, this.canvasRef.current.height);
  }

  gameLoop() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.renderPaddles();
    this.renderPlayers();
  }

  renderPaddles() {
    this.paddles = this.paddles.filter(p => p.destroy === false);
    this.paddles.forEach(p => {
      p.render(this.ctx);
    });
    this.generatePaddles();
  }

  renderPlayers() {}

  generatePaddles() {
    if (this.paddles.length < 50) {
      for (let i = 0; i < 50 - this.paddles.length; i++) {
        this.paddles.push(
          new Paddle({
            position: {
              x: Math.random() * this.canvasRef.current.width + 1,
              y: (Math.random() * 500 + 1) * -1
            },
            wh: window.innerHeight
          })
        );
      }
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    );
  }
}

export default Canvas;
