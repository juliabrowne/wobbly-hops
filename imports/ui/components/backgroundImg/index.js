import React from "react";
// import background from "../../../../gifs/beer-cartoon-doodle-seamless-background-vector-20432954";

export default class BackgroundImg extends React.Component {
  constructor(args) {
    super(args);
    this.wh = args.wh;
    this.beerImage = new Image();
      this.imgUrl = "../../../gifs/garrafa-e-vidro-de-cerveja-no-fundo-do-tijolo-estilo-de-neon-bar-pub-bebida-alcoolica_1262-13367.jpg";
    this.velocityY = 0;
    this.positionY = 0;
    this.wh = args.wh;
    this.ww = args.ww;
  }

  render(ctx) {
    console.log(this.imgUrl);
    console.log(ctx);

    if (this.positionY > 0) this.positionY -= this.velocityY;
      this.beerImage.src = this.imgUrl;
    ctx.drawImage(
          this.beerImage,
         0,
         0,
         this.ww, 
         this.wh,
        );
  }
}
