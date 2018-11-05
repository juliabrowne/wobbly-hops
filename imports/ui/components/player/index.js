import React from "react";

export default class Player extends React.Component {
  constructor(args) {
    super(args);
    this.velocityY = 3;
    this.velocityX = 3;
    this.positionX = 100;
    this.positionY = 0;
    this.radius = 50;
    this.ball;
  }
  drawPlayer = () => {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.positionX, this.positionY, 50, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  };
  render(ctx) {
    this.positionY = this.positionY + this.velocityY;
    if (this.moveDirection === "right") {
      this.positionX = this.positionX + this.velocityX;
    }
    if (this.moveDirection === "left") {
      this.positionX = this.positionX - this.velocityX;
    }
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
