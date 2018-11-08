import React, { Component } from "react";
import "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import Player from '../player';
import Paddle from '../paddle';

const MoveRightButton = ({ moveRight }) => {
  return (
    <button className='rightButton' onMouseDown={() => moveRight()}>
      <img src='./../../../controllerImages/rightArrow.png' />
    </button>
  );
};
const MoveLeftButton = ({ moveLeft }) => {
  return (
    <button className='leftButton' onMouseDown={() => moveLeft()}>
      <img src='./../../../controllerImages/leftArrow.png' />
    </button>
  );
};

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    minHeight: '100vh'
}

class Controller extends Component {
  constructor() {
    super();
  }

  moveRight = player => {
    console.log(player);
    Meteor.call('move.right', player._id);
  };

  moveLeft = player => {
    console.log(player);
    Meteor.call('move.left', player._id);
  };

  render() {
    console.log(this.props);
    const {currentPlayer} = this.props;
    return (
      <div className="root">
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
  const currentPlayer = Players.find({playerId: userId}).fetch();
   return {
    loading: !handle.ready(),
    currentPlayer
  };
})(Controller);
