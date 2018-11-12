import React from "react";
import "./styles.css";
import Paddle from "../paddle";
import Player from "../player";
import ReactAudioPlayer from "react-audio-player";
import Beer from "../beer";
import BeerPaddle from "../beerPaddle";
import RandomPaddle from "../randomPaddle";
import ExtraLife from "../extraLife";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import BackgroundImg from "../backgroundImg";
import { Redirect } from "react-router";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.paddles = [];
    this.beerPaddles = [];
    this.extraLife = [];
    this.randomPaddles = [];
    this.direction = {};
    this.collision = false;
    this.jumping = false;
    this.jumpLength = 0;
    this.started = false;
    this.startGameLoop = this.startGameLoop.bind(this);
    this.players = [];
    this.userId = Meteor.userId();
    this.lives = 3;
    this.playersAlive = 0;
    this.gameOn = true;
  }

  componentDidMount() {
    window.onkeydown = e => {
      this.direction[e.key] = true;
    };
    window.onkeyup = e => {
      delete this.direction[e.key];
    };
    this.ctx = this.canvasRef.current.getContext("2d");

    for (let i = 0; i < 50; i++) {
      this.paddles.push(
        new Paddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width,
          beerPaddles: this.beerPaddles,
          randomPaddles: this.randomPaddles,
          extraLife: this.extraLife
        })
      );
    }
    this.paddles.forEach(p => {
      p.generateXandY(this.paddles);
    });

    for (let i = 0; i <= 8; i++) {
      this.beerPaddles.push(
        new BeerPaddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width,
          paddles: this.paddles,
          randomPaddles: this.randomPaddles,
          extraLife: this.extraLife
        })
      );
    }
    this.beerPaddles.forEach(p => {
      p.generateXandY(this.beerPaddles);
    });
    for (let i = 0; i <= 8; i++) {
      this.randomPaddles.push(
        new RandomPaddle({
          position: {
            x: Math.random() * this.canvasRef.current.width + 1,
            y: (Math.random() * this.canvasRef.current.height + 1) * -1
          },
          wh: this.canvasRef.current.height,
          ww: this.canvasRef.current.width,
          paddles: this.paddles,
          beerPaddles: this.beerPaddles,
          extraLife: this.extraLife
        })
      );
    }
    this.randomPaddles.forEach(p => {
      p.generateXandY(this.randomPaddles);
    });
    this.extraLife.push(
      new ExtraLife({
        position: {
          x: Math.random() * this.canvasRef.current.width + 1,
          y: (Math.random() * this.canvasRef.current.height + 1) * -1
        },
        wh: this.canvasRef.current.height,
        ww: this.canvasRef.current.width,
        paddles: this.paddles,
        beerPaddles: this.beerPaddles,
        randomPaddles: this.randomPaddles
      })
    );

    this.extraLife.forEach(p => {
      p.generateXandY(this.extraLife);
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

  startGameLoop() {
    this.started = true;
    this.gameOn = true;
    this.props.players.forEach(async p => {
      await Meteor.call(
        "init.Player",
        {
          x: this.getRandomInt(this.canvasRef.current.width - 200),
          y: this.canvasRef.current.height / 2,
          playerId: p._id,
          maxX: this.canvasRef.current.width
        },
        () => {
          this.players.push(
            new Player({
              playerId: p._id,
              wh: window.innerHeight,
              ww: window.innerWidth,
              position: p.position,
              moveDirection: "",
              color: p.color,
              paddles: this.paddles,
              beerPaddles: this.beerPaddles,
              randomPaddles: this.randomPaddles,
              extraLife: this.extraLife,
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
    this.ctx.fillStyle = "transparent";
    this.ctx.fillRect(
      0,
      0,
      this.canvasRef.current.width,
      this.canvasRef.current.height
    );
    this.renderBackground();
    this.move(this.props.players[0]);
    this.renderPaddles();
    this.renderBeerPaddles();
    this.renderRandomPaddles();
    this.renderExtraLife();
    this.renderPlayers(this.ctx);
    this.renderBeer();
    this.gameStatus();
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
  renderRandomPaddles = () => {
    this.randomPaddles.forEach(p => {
      p.render(this.ctx, this.randomPaddles);
    });
  };
  renderExtraLife = () => {
    this.extraLife.forEach(p => {
      p.render(this.ctx, this.extraLife);
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
  gameStatus() {
    let count = 0;
    this.props.players.map(player => {
      if (player.alive) {
        return count++;
      }
    });
    if (count > 1) {
      this.gameOn = true;
    } else {
      this.gameOn = false;
    }
  }
  render() {
    const { players } = this.props;
    if (!this.started && !this.props.loading && players.length)
      this.startGameLoop();
    if (this.gameOn) {
      return (
        <div className="flex-container">
          <ReactAudioPlayer
            src="../../../music/Racing-Menu.mp3"
            autoPlay
            loop
          />
          <div className="score">
            <ul className="list">
              {players.length &&
                players.map(player => {
                  const name = {
                    textShadow: `0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px ${
                      player.color
                    }, 0 0 70px ${player.color}, 0 0 80px ${
                      player.color
                    }, 0 0 100px ${player.color}, 0 0 150px ${player.color}`,
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
    } else {
      return <Redirect to="/endGame" />;
    }
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
