import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import ReactAudioPlayer from "react-audio-player";
import { Players} from "../../../api/players"

class lobbyContainer extends Component {
  constructor(){
    super()
    // this.players = Players.find().fetch();
  }
  render() {
    return (
      <div className="root">
        {/* Music taken from www.Bensound.com and is Non-Copyrighted*/}
        <ReactAudioPlayer
          src="../../../music/bensound-allthat.mp3"
          autoPlay
          loop
        />
        <Link to="/intro">
          <h1 className="header">
            W<span className="span">🤪</span>
            BBLY-H<span className="span">🤮</span>PS🍻
          </h1>
        </Link>
        <Link to="/game">
          <button className="setup-button">START GAME</button>
        </Link>
        <h2 className="players-header">Players in Lobby:</h2>
        <div className="players-list"></div>
        <div id="bubbles">
          <div className="bubble x1" />
          <div className="bubble x2" />
          <div className="bubble x3" />
          <div className="bubble x4" />
          <div className="bubble x5" />
          <div className="bubble x6" />
          <div className="bubble x7" />
          <div className="bubble x8" />
          <div className="bubble x9" />
          <div className="bubble x10" />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  const players = Players.find().fetch();
  console.log(players)
  return {
    loading: !handle.ready(),
    players: players
  };
})(lobbyContainer);

// export default lobbyContainer;
