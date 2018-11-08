import React from "react";

class Player extends React.Component {
  constructor(args) {
    super(args);
    this.velocityY = 6;
    this.velocityX = 3;
    this.positionX = args.positionX;
    this.positionY = 0;
    this.height = 25;
    this.width = 25;
    this.paddles = args.paddles;
    this.beerPaddles = args.beerPaddles || [];
    this.wh = args.wh;
    this.jumpLength = 0;
    this.rising = false;
    this.freeze = false;
    this.collision = false;
    this.arr = this.paddles.concat(this.beerPaddles);
    this.controls = false;
    this.color = args.color;
  }

  componentDidMount() {
    this.render();
  }

  render(ctx, paddles, pX) {
    this.positionX = pX;
    this.jumpLength++;
    this.arr.forEach(paddle => {
      if (
        this.positionX < paddle.position.x + paddle.width  && this.positionX + this.width  > paddle.position.x &&
		this.positionY < paddle.position.y + paddle.height && this.positionY + this.height > paddle.position.y
      ) {
        if (!this.collision && !this.rising) {
          this.collision = true;
        }
        if(paddle.name === "beerPaddle") {
          this.freeze = true;
          this.rising = false;
          setTimeout(() => {
            this.freeze = false;
          this.rising = true;
          }, 3000)
        }
      }
    });

    if(!this.freeze) {
      if (this.rising && this.jumpLength > 25) {
        this.rising = false;
        this.jumpLength = 0;
      }
      if (this.positionY >= this.wh - this.height || this.collision) {
        if (this.collision) this.jumpLength = 0;
        this.rising = true;
        this.collision = false;
      }
      if(this.positionY <= 0 ) {
        this.rising = false;
      }
    }

    switch (true) {
      case this.rising:
        this.positionY -= this.velocityY;
        break;
      case this.freeze:
        this.positionY += 1;
        break;
      default:
        this.positionY += this.velocityY;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
  }
}

export default Player;
