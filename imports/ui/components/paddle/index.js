import React, { Component } from "react";

export default class Paddle extends Component{
  constructor(args) {
    super(args);
    this.position = args.position;
    this.wh = args.wh;
    this.ww = args.ww;
    this.width = 100;
    this.height = 25;
    this.velocity = 1;
    this.freezePaddles = args.freezePaddles;
    this.randomPaddles = args.randomPaddles;
    this.extraLife = args.extraLife;
    this.name = "paddle";
    this.paddleImage = new Image();
    this.imgUrl = "../../../pictures/blackPaddle-min.jpg";
  }

  checkDistance(paddles) {
    let a;
    let b;
    let c;

    paddles.forEach(p => {
      a = this.position.x - p.position.x;
      b = this.position.y - p.position.y;
      c = Math.sqrt(a * a + b * b);
      if (c < 100 && c !== 0) {
        this.generateXandY(paddles);
      } else {
        return;
      }
    });
  }

  generateXandY(paddles) {
    let allPaddles = paddles.concat(this.freezePaddles, this.randomPaddles, this.extraLife);
    this.position.x = Math.random() * this.ww + 1;
    this.position.y = (Math.random() * this.wh + 1) * -2;
    this.checkDistance(allPaddles);
  }

  render(ctx, paddles) {
    this.position.y = this.position.y + this.velocity;
    ctx.drawImage(this.paddleImage, this.position.x, this.position.y, 100, 25);
    this.paddleImage.src = this.imgUrl;
    if (this.position.y > this.wh) {
      this.generateXandY(paddles);
    }
  }
}
