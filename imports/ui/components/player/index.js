import React from "react";

export default class Player extends React.Component {
  constructor(args) {
    super(args);
    this.velocityY = 3;
    this.velocityX = 3;
    this.positionX = 400;
    this.positionY = -100;
    this.height = 50;
    this.width = 50;
    this.ball;
  }
  // drawPlayer = () => {
  //   this.ctx.fillStyle = "white";
  //   this.ctx.beginPath();
  //   this.ctx.arc(this.positionX, this.positionY, 50, 0, Math.PI * 2, true);
  //   this.ctx.fill();
  //   this.ctx.lineWidth = 2;
  //   this.ctx.strokeStyle = "black";
  //   this.ctx.stroke();
  // };
  render(ctx) {
    // this.positionY = this.positionY + this.velocityY;
    if (this.moveDirection === "right") {
      this.positionX = this.positionX + this.velocityX;
    }
    if (this.moveDirection === "left") {
      this.positionX = this.positionX - this.velocityX;
    }
    ctx.fillStyle = "red";
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
