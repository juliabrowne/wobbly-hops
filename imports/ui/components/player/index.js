import React from "react";

class Player extends React.Component {
  constructor(args) {
    super(args);
    this.velocityY = 6;
    this.velocityX = 3;
    this.positionX = args.positionX || 200;
    this.positionY = 0;
    this.height = 25;
    this.width = 25;
    // this.ball;
    this.wh = args.wh;
    this.jumpHeight = 0;
    this.rising = false;
    this.collision = false;
    this.color = args.color;
  }

  componentDidMount() {
    this.render()
  }

  // prettier-ignore
  render(ctx, paddles, pX) {
    this.positionX = pX;
    this.jumpHeight++;
    paddles.forEach(paddle => {
      if (
        // (this.positionX > (paddle.position.x - (this.height / 2) - paddle.width / 2)) &&
        // (this.positionX < (paddle.position.x + (this.height / 2) + paddle.width / 2)) &&
        // (this.positionY < paddle.position.y) &&
        // (this.positionY > (paddle.position.y - (this.height / 2) - paddle.height / 2))
        this.positionX < paddle.position.x + paddle.width  && this.positionX + this.width  > paddle.position.x &&
		this.positionY < paddle.position.y + paddle.height && this.positionY + this.height > paddle.position.y
      ) {
        if (!this.collision && !this.rising) {
          this.collision = true;
        }
      }
    });

    if (this.rising && this.jumpHeight > 50) {
      this.jumpHeight = 0;
      this.rising = false;
    }

    if (this.positionY >= this.wh - this.height || this.collision) {
      if (this.collision) this.jumpHeight = 0;
      this.rising = true;
      this.collision = false;
    }

    if(this.positionY <= 0 ) {
      this.rising = false;
    }

    switch (true) {
      case this.rising:
        this.positionY -= this.velocityY;
        break;
      default:
        this.positionY += this.velocityY;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
    this.jumpHeight++;
  }
 
}

export default Player;