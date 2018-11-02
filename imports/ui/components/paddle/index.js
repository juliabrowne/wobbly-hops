import React from "react";

export default class Paddle extends React.Component {
  constructor(args) {
    super(args);
    this.position = args.position;
    this.wh = args.wh;
    this.width = 100;
    this.height = 25;
    this.velocity = 1;
    this.destroy = false;
  }
  render(ctx) {
    this.position.y = this.position.y + this.velocity;
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, 100, 25);
    if (this.position.y > this.wh) {
      this.destroy = true;
    }
  }
}
