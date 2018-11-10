import React, { Component } from "react";
import "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Meteor } from "meteor/meteor";
import ReactNipple from "react-nipple";
import "react-nipple/lib/styles.css";

class Joystick extends React.Component {
<<<<<<< HEAD
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
=======
    constructor() {
        super();
        this.direction = {
        };
    }

    moveJoystick = (player, data) => {
        if (player.length > 0) {
            if (data.direction.x === 'left') {
                Meteor.call('move.left', player[0]._id);
                   }
                else{
                 Meteor.call('move.right', player[0]._id);
            }
        }
    };

    render() {
        const {currentPlayer} = this.props
        return (
          <div>
            <ReactNipple
              options={{
                mode: 'static',
                position: { top: '65%', left: '50%' },
                color: 'teal',
                size: 650
              }}
              style={{
                width: '100vw',
                height: '100vh',
                position: 'relative'
              }}
              onMove={(evt, data) =>
               currentPlayer && this.moveJoystick(currentPlayer, data)
            }
            />
          </div>
        );
      }
}

export default withTracker( () => {
    const handle = Meteor.subscribe("players");
    const userId = Meteor.userId();
    const currentPlayer =  Players.find({ playerId: userId }).fetch();
    return {
      loading: !handle.ready(),
      currentPlayer
    };
  })(Joystick);
>>>>>>> 91b9ad76e9cdb16cbea436fd6042b2c0cd345eab
