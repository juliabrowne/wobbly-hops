import React, { Component } from "react";
import { Players } from "../../../api/players";
import { withTracker } from "meteor/react-meteor-data";
import "./styles.css";
import { Link } from "react-router-dom";

class endGame extends Component {
  render() {
    return (
      <div className="winner-container">
        <h1 className="winner">WINNER!!!</h1>
        {this.props.players.map(player => {
          const name = {
            color: player.color
          };
          if (player.lives > 0) {
            return (
              <h2 className="player" style={name} key={player._id}>
                {player.name}
              </h2>
            );
          }
        })}
        <div className="button-container">
          <Link to="/game">
            <button className="endGame-button">Replay</button>
          </Link>
          <Link to="/intro">
            <button className="endGame-button">Quit</button>
          </Link>
        </div>
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
})(endGame);
