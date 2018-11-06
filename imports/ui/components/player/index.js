import React from "react";

export default class Player extends React.Component {
  constructor(args) {
    super(args);
    this.velocityY = 6;
    this.velocityX = 3;
    this.positionX = 100;
    this.positionY = 0;
    this.height = 25;
    this.width = 25;
    this.ball;
    this.wh = args.wh;
    this.paddles = args.paddles;
    this.jumpLength = 0;
    this.rising = false;
    this.collision = false;
  }

  // prettier-ignore
  render(ctx) {
    console.log("PlayerY:", this.positionY)
    this.jumpLength++;
    this.paddles.forEach(paddle => {
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

    if (this.rising && this.jumpLength > 25) {
      this.jumpLength = 0;
      this.rising = false;
    }

    if (this.positionY >= this.wh - this.height || this.collision) {
      if (this.collision) this.jumpLength = 0;
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

    if (this.moveDirection === "right") {
      this.positionX = this.positionX + this.velocityX;
    }
    if (this.moveDirection === "left") {
      this.positionX = this.positionX - this.velocityX;
    }
    ctx.fillStyle = "red";
    ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
    this.jumpHeight++;
  }
}
