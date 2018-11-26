import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Meteor } from "meteor/meteor";
import ReactNipple from "react-nipple";
import "./style.css";
import PropTypes from "prop-types";

class Nipple extends Component {
  constructor() {
    super();
    this.direction = "";
  }

  move = player => {
    if (this.direction === "right") {
      Meteor.call("move.right", player[0]._id);
    }
    if (this.direction === "left") {
      Meteor.call("move.left", player[0]._id);
    }
  };

  moveJoystick = (player, data) => {
    this.direction = data.direction.x;
    this.move(player);
  };

  render() {
    const { currentPlayer } = this.props;
    return (
      <div className="nipple-container">
        {currentPlayer.map(player => {
          const name = {
            color: player.color
          };
          return (
            <h1 key={player._id} style={name} className="nipple-name">
              {player.name}
            </h1>
          );
        })}
        <ReactNipple
          options={{
            mode: "static",
            position: { top: "40%", left: "50%" },
            color: "#FF69B4",
            size: 500
          }}
          style={{
            width: "100%",
            height: "80%",
            background: "#FFDAB9",
            position: "relative"
          }}
          onMove={(evt, data) => {
            this.moveJoystick(currentPlayer, data);
          }}
        />
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  const userId = Meteor.userId();
  const currentPlayer = Players.find({ playerId: userId }).fetch();
  return {
    loading: !handle.ready(),
    currentPlayer
  };
})(Nipple);

Nipple.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string
};
