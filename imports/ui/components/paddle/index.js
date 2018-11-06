import React from "react";

export default class Paddle extends React.Component {
  constructor(args) {
    super(args);
    this.position = args.position;
    this.color = args.color;
    this.wh = args.wh;
    this.ww = args.ww;
    this.width = 100;
    this.height = 25;
    this.velocity = 3;
    this.destroy = false;
  }
  render(ctx) {
    this.position.y = this.position.y + this.velocity;
    ctx.fillRect(this.position.x, this.position.y, 100, 25);
    ctx.fillStyle = 'black'
    if (this.position.y > this.wh) {
      console.log("Regenerate");
      this.position.x = Math.random() * this.ww + 1;
      this.position.y = (Math.random() * this.wh + 1) * -1;
    }
  }
}
