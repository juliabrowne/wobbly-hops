import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ScoreboardContainer from "../scoreboard";
import ReactAudioPlayer from "react-audio-player";
import Beer from "../beer";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.direction = {};
    this.collision = false;
    this.jumping = false;
    this.jumpLength = 0;
    this.started = false;
    this.startGameLoop = this.startGameLoop.bind(this)
    this.players = []
  }

  componentDidMount() {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    this.ctx = this.canvasRef.current.getContext("2d");

    for (let i = 0; i < 100 - this.paddles.length; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width,
          paddles: this.paddles
        })
      );
    }
  }
  move = player => {
    if ("ArrowRight" in this.direction) {
      Meteor.call("move.right", player._id);
    }
    if ("ArrowLeft" in this.direction) {
      Meteor.call("move.left", player._id);
    }
  };

  startGameLoop(){
    this.started = true;
    this.props.players.forEach(async p => {
      
      await Meteor.call("init.Player", {
        x: this.canvasRef.current.width / 2,
        y: this.canvasRef.current.height / 2,
        playerId: p._id
      }, () => {
        this.players.push(new Player({
          playerId: p._id,
          wh: window.innerHeight,
          color: p.color,
          positionX: this.canvasRef.current.width / 2,
        }))
      });
    });

    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
  }

  gameLoop() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.renderPaddles();
    this.renderPlayers(this.ctx);
    this.renderBeer();
    this.move(this.props.players[0]);
  }

  renderPaddles = () => {
    this.paddles.forEach(p => {
      p.render(this.ctx, this.paddles);
    });
  };

  renderPlayers = () => {
    this.players.forEach(p => {
      const update = this.props.players.find(player => player._id === p.props.playerId)
      console.log(update)
      p.render(this.ctx, this.paddles, update.x);
    });
  };

  renderBeer = () => {
    this.beer.render(this.ctx);
  };

  render() {
      if(!this.started && !this.props.loading && this.props.players.length) this.startGameLoop()
      return (
        <div className="flex-container">
          <ReactAudioPlayer
            src="../../../music/Racing-Menu.mp3"
            autoPlay
            loop
          />
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
  const players = Players.find().fetch()
  return {
    loading:!handle.ready(),
    players: players
  };
})(Canvas);
