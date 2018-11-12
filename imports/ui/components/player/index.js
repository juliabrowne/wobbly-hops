import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

class Player extends Component{
  constructor(args) {
    super(args);
    this.velocityY = 6;
    this.velocityX = 3;
    this.positionX = args.positionX;
    this.positionY = 0;
    this.height = 25;
    this.width = 25;
    this.paddles = args.paddles;
    this.freezePaddles = args.freezePaddles;
    this.randomPaddles = args.randomPaddles;
    this.extraLife = args.extraLife;
    this.wh = args.wh;
    this.ww = args.ww;
    this.jumpLength = 0;
    this.rising = false;
    this.freeze = false;
    this.collision = false;
    this.arr = this.paddles.concat(
      this.randomPaddles,
      this.freezePaddles,
      this.extraLife
    );
    this.color = args.color;
    this.player = args.playerId;
    this.beer = args.beer;
    this.lives = 3;
  }

  componentDidMount() {
    this.render();
  }

  render(ctx, paddles, pX) {
    if (this.lives !== 0) {
      this.positionX = pX;
      this.jumpLength++;
      this.arr.forEach(paddle => {
        if (
          this.positionX < paddle.position.x + paddle.width &&
          this.positionX + this.width > paddle.position.x &&
          this.positionY < paddle.position.y + paddle.height &&
          this.positionY + this.height > paddle.position.y
        ) {
          if (!this.collision && !this.rising) {
            this.collision = true;
          }
          if (paddle.name === "freezePaddle") {
            this.positionY = paddle.position.y - this.height - 1;
            this.freeze = true;
            Meteor.call("freeze.player", this.player);
            this.rising = false;
            setTimeout(() => {
              this.jumpLength = 0;
              this.freeze = false;
              Meteor.call("unFreeze.player", this.player);
              this.rising = true;
            }, 3000);
          }
          if (paddle.name === "randomPaddle") {
            this.positionY = paddle.position.y - this.height - 1;
            Meteor.call("randomize.player", this.player, this.ww);
          }
          if (paddle.name === "extraLife") {
            this.positionY = paddle.position.y - this.height - 1;
            Meteor.call("addLife.player", this.player);
            this.positionY = 0;
            this.lives += 1;
          }
        }
      });

      if (this.positionY > this.beer.positionY) {
        if (this.positionY > this.beer.positionY) {
          Meteor.call("loseLife.player", this.player);
          this.positionY = 0;
          this.lives -= 1;
        }
      }
      if (!this.freeze) {
        if (this.rising && this.jumpLength > 25) {
          this.rising = false;
          this.jumpLength = 0;
        }
        if (this.positionY >= this.wh - this.height || this.collision) {
          if (this.collision) this.jumpLength = 0;
          this.rising = true;
          this.collision = false;
        }
        if (this.positionY <= 0) {
          this.rising = false;
        }
      }
      switch (true) {
        case this.rising:
          this.positionY -= this.velocityY;
          break;
        case this.freeze:
          this.positionY += 1;
          break;
        default:
          this.positionY += this.velocityY;
      }
      ctx.fillStyle = this.color;
      ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
    } else if (this.lives === 0) {
      Meteor.call("kill.player", this.player);
    }
  }
}

export default Player;
