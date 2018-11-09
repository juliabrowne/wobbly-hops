import React, { Component } from "react";
import { Players } from "../../../api/players";
import { withTracker } from "meteor/react-meteor-data";
import "./styles.css";

class endGame extends Component {
  render() {
    const { players } = this.props;
    return (
      <div>
        <h1>WINNER !!</h1>
        {players.length &&
          players.map(player => {
            if (player.lifes > 0) {
              return <h2>{player.name}</h2>;
            }
          })}
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
