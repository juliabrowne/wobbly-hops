import React, { Component } from "react";
import "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Meteor } from "meteor/meteor";
import MetaTags from 'react-meta-tags';

const MoveRightButton = ({ moveRight }) => {
  return (
    <button className='rightButton' onClick={() => moveRight()}>
      <img src='./../../../controllerImages/rightArrow.png' />
    </button>
  );
};
const MoveLeftButton = ({ moveLeft }) => {
  return (
    <button className='leftButton' onClick={() => moveLeft()}>
      <img src='./../../../controllerImages/leftArrow.png' />
    </button>
  );
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-around",
  minHeight: "100vh"
};

class Controller extends Component {
  constructor() {
    super();
    this.direction = {};
  }

  moveRight = player => {
    Meteor.call("move.right", player._id);
  };

  moveLeft = player => {
    Meteor.call("move.left", player._id);
  };

  componentDidMount() {
    MoveRightButton.onkeydown = e => {
        this.direction[e.key] = true;
    };
    MoveRightButton.onkeyup = e => {
        delete this.direction[e.key];
    };
    MoveLeftButton.onkeydown = e => {
        this.direction[e.key] = true;
    };
    MoveLeftButton.onkeyup = e => {
        delete this.direction[e.key];
    };
  };

  render() {
    console.log(this.props);
    const {currentPlayer} = this.props;
    return (<div className="root">
    <MetaTags>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'/>
    </MetaTags>
        <div className="buttonRow" style={rowStyle}>
          <MoveLeftButton moveLeft={() => this.moveLeft(currentPlayer[0])} />
          <MoveRightButton moveRight={() => this.moveRight(currentPlayer[0])} />
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
