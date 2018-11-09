import React from "react";

export default class Beer extends React.Component {
  constructor(args) {
    super(args);
    this.wh = args.wh;
    this.beerImage = new Image();
    this.imgUrl = "https://i.gifer.com/wmp.gif";
    this.velocityY = 0.07;
    this.positionY = args.wh + 100;
    this.wh = args.wh;
  }

  render(ctx) {
    if (this.positionY > 0) this.positionY -= this.velocityY;

    ctx.drawImage(this.beerImage, 0, this.positionY, 1250, 1000);
    this.beerImage.src = this.imgUrl;
  }
}
