import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ScoreboardContainer from '../scoreboard'
import ReactAudioPlayer from "react-audio-player";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.players = [];
    this.direction = {};
    this.collision = false;
    this.jumping = false;
    this.jumpLength = 0;
  }

  componentDidMount() {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    this.ctx = this.canvasRef.current.getContext("2d");
    // this.generatePaddles();
    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
    console.log(this.canvasRef.current.width, this.canvasRef.current.height);
    for (let i = 0; i < 15 - this.paddles.length; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width
        })
      );
    }
    this.players.push(
      new Player({
        position: {
          x: this.canvasRef.current.width / 2,
          y: this.canvasRef.current.height / 2
        },
        moveDirection: "",
        wh: window.innerHeight,
        paddles: this.paddles
      })
    );
  }
  move = () => {
    if ("ArrowRight" in this.direction) {
      // if (this.positionX >= this.canvas.width) {
      //   this.positionX = 0;
      // }
      this.players[0].positionX += this.players[0].velocityX;
    }
    if ("ArrowLeft" in this.direction) {
      // if (this.positionX <= 0) {
      //   this.positionX = this.canvas.width;
      // }
      this.players[0].positionX -= this.players[0].velocityX;
    }
  };

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
    this.move();
  }

  renderPaddles = () => {
    // this.paddles = this.paddles.filter(p => p.destroy === false);
    this.paddles.forEach(p => {
      p.render(this.ctx);
    });
    // this.generatePaddles();
  };

  renderPlayers = () => {
    this.players[0].render(this.ctx);
  };

  render() {
    return <div className="flex-container">
        <ReactAudioPlayer src="../../../music/Racing-Menu.mp3" autoPlay loop />
        <div className="left score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
        <canvas ref={this.canvasRef} width={window.innerWidth - 275} height={window.innerHeight} />
        <div className="right score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
      </div>;
  }
}

export default Canvas;
