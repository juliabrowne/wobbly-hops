import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ScoreboardContainer from "../scoreboard";
import ReactAudioPlayer from "react-audio-player";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.players = [];
    this.direction = {};
    this.collision = false;
    this.jumping = false;
    this.jumpLength = 0;
  }

  componentDidUpdate(prevProps) {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    this.ctx = this.canvasRef.current.getContext("2d");
    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
    for (let i = 0; i < 100 - this.paddles.length; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width
        })
      );
    }

    this.props.players.map(async p => {
      await Meteor.call("init.Player", {
        x: this.canvasRef.current.width / 2,
        y: this.canvasRef.current.height / 2,
        userId: p.userId
      });
      this.players.push(new Player({
        userId: p.userId,
        position: p.position,
        moveDirection: "",
        wh: window.innerHeight,
        paddles: this.paddles,
        color: p.color
      }));
    });
  }
  move = userId => {
    if ("ArrowRight" in this.direction) {
      // Meteor.call("move.right", userId);

      // if (this.positionX >= this.canvas.width) {
      //   this.positionX = 0;
      // }
      this.players[0].positionX += this.players[0].velocityX;
    }
    if ("ArrowLeft" in this.direction) {
      // Meteor.call("move.left", userId);

      // if (this.positionX <= 0) {
      //   this.positionX = this.canvas.width;
      // }
      this.players[0].positionX -= this.players[0].velocityX;
    }
  };

  gameLoop() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.renderPaddles();
    this.renderPlayers();
    this.move();
  }

  renderPaddles = () => {
    this.paddles.forEach(p => {
      p.render(this.ctx);
    });
  };

  renderPlayers = () => {
    this.players.map(p => {
      p.color = this.props.players[2].color
      p.render(this.ctx, p);
    });
  };

  render() {
    return (
      <div className="flex-container">
        <ReactAudioPlayer src="../../../music/Racing-Menu.mp3" autoPlay loop />
        <div className="left score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
        <canvas
          ref={this.canvasRef}
          width={window.innerWidth - 275}
          height={window.innerHeight}
        />
        <div className="right score">
          <ScoreboardContainer />
          <ScoreboardContainer />
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  return {
    loading: handle.ready(),
    players: Players.find().fetch()
  };
})(Canvas);
