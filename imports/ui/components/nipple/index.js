import React, { Component } from "react";
import "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Meteor } from "meteor/meteor";
import ReactNipple from "react-nipple";
import "react-nipple/lib/styles.css";

const count = 0;

class Joystick extends React.Component {
  constructor() {
    super();
    this.direction = {
      left: false,
      right: false
    };
  }

  moveJoystick = (player, data) => {
    const { degree } = data.angle;

    if (degree > 60 || degree < 297) {
      Meteor.call("move.right", player._id);
    } else if (degree > 131 && degree < 245) {
      Meteor.call("move.left", player._id);
    }
    count++;
  };

  render() {
    return (
      <div>
        <ReactNipple
          options={{
            mode: "static",
            position: { top: "50%", left: "50%" },
            color: "darkOrange",
            size: 350
          }}
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative"
          }}
          onMove={this.moveJoystick}
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
})(Joystick);
