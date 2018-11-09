import React, { Component } from 'react';
import './styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Players } from '../../../api/players';
import { Meteor } from 'meteor/meteor';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';

class Joystick extends React.Component {

    constructor() {
        super();
        this.direction = {
            left: false,
            right: false
        };
    }

    moveJoystick = (player, data) => {
    const {degree}  = data.angle;
        // console.log(data.angle)
        if(player.length > 0){
            if (degree > 60 && degree < 280) {
                console.log(degree)
                Meteor.call('move.left', player[0]._id);
                   }
            // if (degree > 120 && degree < 230) {
                else{
                console.log(degree)
                 Meteor.call('move.right', player[0]._id);
            }
        }
    };

    render() {
        const {currentPlayer} = this.props
        console.log(currentPlayer)
        return (
          <div>
            <ReactNipple
              options={{
                mode: 'static',
                position: { top: '50%', left: '50%' },
                color: 'darkOrange',
                size: 350
              }}
              style={{
                width: '100vw',
                height: '100vh',
                position: 'relative'
              }}
              onMove={(evt, data) =>
               currentPlayer &&  this.moveJoystick(currentPlayer, data)
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