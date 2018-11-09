import React, { Component } from "react";
import "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Meteor } from "meteor/meteor";
import MetaTags from "react-meta-tags";

// const MoveRightButton = ({ moveRight }) => {
//   return (
//     <button className='rightButton' onTouchStart={() => moveRight()}>
//       <img src='./../../../controllerImages/rightArrow.png' />
//     </button>
//   );
// };
// const MoveLeftButton = ({ moveLeft }) => {
//   return (
//     <button className='leftButton' onTouchStart={() => moveLeft()}>
//       <img src='./../../../controllerImages/leftArrow.png' />
//     </button>
//   );
// };

const rowStyle = {
  display: "flex",
  justifyContent: "space-around",
  minHeight: "100vh"
};

class Controller extends Component {
  constructor() {
    super();
    this.direction = {
      left: false,
      right: false
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.direction.left) {
        Meteor.call("move.left", this.props.currentPlayer[0]._id);
      }
      if (this.direction.right) {
        Meteor.call("move.right", this.props.currentPlayer[0]._id);
      }
    }, 60);
  }

  go = direction => {
    this.direction[direction] = true;
  };

  stopGoing = direction => {
    this.direction[direction] = false;
  };

  render() {
    return (
      <div className="root">
        <MetaTags>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </MetaTags>
        <div className="buttonRow" style={rowStyle}>
          <button
            className="leftButton"
            onMouseDown={event => {
              this.go("left");
            }}
            onMouseUp={event => {
              this.stopGoing("left");
            }}
          >
            <img src="./../../../controllerImages/leftArrow.png" />
          </button>

          <button
            className="rightButton"
            onMouseDown={event => {
              this.go("right");
            }}
            onMouseUp={event => {
              this.stopGoing("right");
            }}
          >
            <img src="./../../../controllerImages/rightArrow.png" />
          </button>
        </div>
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
})(Controller);
