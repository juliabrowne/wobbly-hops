import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ReactAudioPlayer from "react-audio-player";
import Beer from "../beer";
import BeerPaddle from "../beerPaddle";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import BackgroundImg from "../backgroundImg";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.beerPaddles = [];
    this.direction = {};
    this.collision = false;
    this.jumping = false;
    this.jumpLength = 0;
    this.started = false;
    this.startGameLoop = this.startGameLoop.bind(this);
    this.players = [];
    this.userId = Meteor.userId();
    this.lives = 3;
    // this.gameOn = true;
  }

  componentDidMount() {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    this.ctx = this.canvasRef.current.getContext("2d");

    for (let i = 0; i < 40; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width,
          beerPaddles: this.beerPaddles
        })
      );
    }
    this.paddles.forEach(p => {
      p.generateXandY(this.paddles);
    });

    for (let i = 0; i <= 10; i++) {
      this.beerPaddles.push(
        new BeerPaddle({
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
    this.beerPaddles.forEach(p => {
      p.generateXandY(this.beerPaddles);
    });
    this.beer = new Beer({
      wh: this.canvasRef.current.height,
      ww: this.canvasRef.current.width
    });
    this.BackgroundImg = new BackgroundImg({
      wh: this.canvasRef.current.height,
      ww: this.canvasRef.current.width
    });
  }

  move = player => {
    if ("ArrowRight" in this.direction) {
      Meteor.call("move.right", player._id);
    }
    if ("ArrowLeft" in this.direction) {
      Meteor.call("move.left", player._id);
    }
  };

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  // gameStatus() {
  //   let count = 0;
  //   this.props.players.map(player => {
  //     if (player.lives > 0) {
  //       count++;
  //     }
  //     if (count > 1) {
  //       this.gameOn = true;
  //     } else {
  //       this.gameOn = false;
  //     }
  //   });
  // }

  // componentDidUpdate() {
  //   this.gameStatus();
  // }
  startGameLoop() {
    this.started = true;
    this.props.players.forEach(async p => {
      await Meteor.call(
        "init.Player",
        {
          x: this.getRandomInt(this.canvasRef.current.width),
          y: this.canvasRef.current.height / 2,
          playerId: p._id,
          maxX: this.canvasRef.current.width
        },
        () => {
          this.players.push(
            new Player({
              playerId: p._id,
              wh: window.innerHeight,
              position: p.position,
              moveDirection: "",
              color: p.color,
              paddles: this.paddles,
              beerPaddles: this.beerPaddles,
              positionX: this.canvasRef.current.width / 2,
              currentPlayer: Players.find({ playerId: this.userId }).fetch(),
              beer: this.beer
            })
          );
        }
      );
    });
    setInterval(() => requestAnimationFrame(() => this.gameLoop()), 16);
  }

  gameLoop() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    // this.renderBackground();
    this.move(this.props.players[0]);
    this.renderPaddles();
    this.renderBeerPaddles();
    this.renderPlayers(this.ctx);
    // this.renderBeer();
  }

  renderPaddles = () => {
    this.paddles.forEach(p => {
      p.render(this.ctx, this.paddles);
    });
  };
  renderBeerPaddles = () => {
    this.beerPaddles.forEach(p => {
      p.render(this.ctx, this.beerPaddles);
    });
  };
  renderPlayers = () => {
    this.players.forEach(p => {
      const update = this.props.players.find(
        player => player._id === p.props.playerId
      );
      p.render(this.ctx, this.paddles, update.x);
    });
  };

  renderBeer = () => {
    this.beer.render(this.ctx);
  };

  renderHeart = lives => {
    let images = [];
    for (let i = 0; i < lives; i++) {
      images.push(
        <img
          key={i}
          className="heart-image"
          src="../../../pictures/heart.png"
        />
      );
    }
    return images;
  };

  renderBackground = () => {
    this.BackgroundImg.render(this.ctx);
  };

  render() {
    const { players } = this.props;
    if (!this.started && !this.props.loading && players.length)
      this.startGameLoop();
    return (
      <div className="flex-container">
        <ReactAudioPlayer src="../../../music/Racing-Menu.mp3" autoPlay loop />
        <div className="score">
          <ul className="list">
            {players.length &&
              players.map(player => {
                const name = {
                  color: player.color,
                  textAlign: "center",
                  fontSize: 25,
                  margin: 0
                };
                return (
                  <li key={player._id} style={name}>
                    {player.name} {this.renderHeart(player.lives)}
                  </li>
                );
              })}
          </ul>
        </div>
        <canvas
          ref={this.canvasRef}
          width={window.innerWidth - 200}
          height={window.innerHeight}
        />
      </div>
    );
  }
}
export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  const players = Players.find().fetch();
  return {
    loading: !handle.ready(),
    players: players
  };
})(Canvas);
