import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.players = [];
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
    // this.checkCollision(this.paddles, this.players);
  }

  renderPaddles() {
    this.paddles = this.paddles.filter(p => p.destroy === false);
    this.paddles.forEach(p => {
      p.render(this.ctx);
    });
    this.generatePaddles();
  }

  renderPlayers() {
    this.players.forEach(p => {
      p.render(this.ctx);
    });
    this.generatePlayers();
  }

  generatePaddles() {
    if (this.paddles.length < 5) {
      for (let i = 0; i < 5 - this.paddles.length; i++) {
        this.paddles.push(
          new Paddle({
            position: {
              x: Math.random() * this.canvasRef.current.width + 1,
              y: (Math.random() * this.canvasRef.current.height + 1) * -1
            },
            wh: window.innerHeight
          })
        );
      }
    }
  }

  generatePlayers() {
    this.players.push(
      new Player({
        position: {
          x: this.canvasRef.current.width / 2,
          y: this.canvasRef.current.height / 2
        }
      })
    );
  }

  // checkCollision(paddles, players) {
  //   // The objects are touching
  //   this.players.forEach(player => {
  //     this.paddles.forEach(paddle => {
  //       if (
  //         player.position.x < paddle.position.x + paddle.width &&
  //         player.position.x + player.width > paddle.position.x &&
  //         player.position.y < paddle.position.y + paddle.height &&
  //         player.position.y + player.height > paddle.position.y
  //       ) {
  //         console.log("Touching");
  //       }
  //     });
  //   });
  // }

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
