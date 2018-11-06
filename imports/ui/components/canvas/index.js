import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ScoreboardContainer from "../scoreboard";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.players = [];
    this.direction = {};
    this.collision = false;
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
    this.bounce();
    this.checkCollision(this.paddles);
  }
  bounce = () => {
    if (
      this.players[0].positionY >=
        this.canvasRef.current.height - this.players[0].height 
    ) {
      //   // Bounce
      this.players[0].velocityY = this.players[0].velocityY * -1;
      // setTimeout(() => {
      //   this.players[0].velocityY = this.players[0].velocityY * -1;
      // }, 750);
    }
    if (this.checkCollision(this.paddles)) {
      console.log(this.checkCollision(this.paddles))
      this.players[0].velocityY = this.players[0].velocityY * -1;
    }
    this.players[0].positionY += this.players[0].velocityY;
  };

  renderPaddles() {
    this.paddles = this.paddles.filter(p => p.destroy === false);
    this.paddles.forEach(p => {
      p.render(this.ctx);
    });
    this.generatePaddles();
  }

  renderPlayers() {
    // this.players.forEach(p => {
    //   p.render(this.ctx);
    // });

    this.generatePlayers();
    // setTimeout(() => {
    //   this.players[0].render(this.ctx);
    // }, 50)
    this.players[0].render(this.ctx);
  }

  generatePaddles() {
    if (this.paddles.length < 15) {
      for (let i = 0; i < 15 - this.paddles.length; i++) {
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
        },
        moveDirection: ""
      })
    );
  }

  checkCollision(paddles) {
    paddles.forEach(paddle => {
      if (
        paddle.position.x < this.players[0].positionX + this.players[0].width &&
        paddle.position.x + paddle.width > this.players[0].positionX &&
        paddle.position.y <
          this.players[0].positionY + this.players[0].height &&
        paddle.height + paddle.position.y > this.players[0].positionY
      ) {
        // if (this.players[0].positionY <= paddle.position.y) {
        //   this.collision = true;
        //   console.log("bounce");
        //   return;
        // }
        // if (
        //   this.players[0].positionY + this.players[0].height >=
        //   Math.round(paddle.position.y)
        // ) {
          console.log("here");
          this.collision = true;
          return true;
        // }

      }
      else{
        this.collision = false
        return false
      }
    });
  }

  render() {
    return (
      <div className="flex-container">
        <div className="left score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
        <canvas
          ref={this.canvasRef}
          width={window.innerWidth - 275}
          height={window.innerHeight}
        />
        <div className="right score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
      </div>
    );
  }
}

export default Canvas;
