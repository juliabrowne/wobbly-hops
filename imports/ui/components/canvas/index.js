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
    this.generatePaddles();
    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
    console.log(this.canvasRef.current.width, this.canvasRef.current.height);
  }

  gameLoop() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.renderPaddles();
    this.renderPlayers();
  }

  renderPaddles() {
    this.paddles.forEach(p => p.render(this.ctx));
  }

  renderPlayers() {}

  generatePaddles() {
    for (let i = 0; i < 50; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: Math.random() * this.canvasRef.current.height + 1
          }
        })
      );
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} width={640} height={425} />
      </div>
    );
  }
}

export default Canvas;
