import React, { Component } from "react";

export default class BackgroundImg extends Component {
  constructor(args) {
    super(args);
    this.wh = args.wh;
    this.backgroundImage = new Image();
    this.imgUrl = "../../../pictures/greyBackground-min.jpg";
    this.velocityY = 0;
    this.positionY = 0;
    this.wh = args.wh;
    this.ww = args.ww;
  }

  render(ctx) {
    if (this.positionY > 0) this.positionY -= this.velocityY;
    this.backgroundImage.src = this.imgUrl;
    ctx.drawImage(this.backgroundImage, 0, 0, this.ww, this.wh);
  }
}
