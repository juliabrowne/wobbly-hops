import React from "react";

export default class Beer extends React.Component {
  constructor(args) {
    super(args);
    this.beerImage = new Image();
    this.imgUrl = "../../../gifs/beer-bubbles1.png";
    this.velocityY = 0.07;
    this.positionY = args.wh + 100;
    this.wh = args.wh;
    this.ww = args.ww;
  }

  render(ctx) {
    if (this.positionY > 0) this.positionY -= this.velocityY;

    ctx.drawImage(this.beerImage, 0, this.positionY, this.ww, 1000);
    this.beerImage.src = this.imgUrl;
  }
}
