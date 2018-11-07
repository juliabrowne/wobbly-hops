import React, {
    Component
} from "react";
import './styles.css';
import {
    withTracker
} from "meteor/react-meteor-data";
import {
    Players
} from "../../../api/players";
import { Meteor } from "meteor/meteor";
import Player from '../player';
import Paddle from '../paddle';

const MoveRightButton = ({ moveRight }) => {
    return <button className='rightButton' onClick={() => moveRight()}><i class="fas fa-arrow-circle-right"></i></button>;
};
const MoveLeftButton = ({ moveLeft }) => {
    return <button className='leftButton' onClick={() => moveLeft()}><img src='./../../../controllerImages/leftArrow.png' /></button>;
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

    moveRight = () => {
        event.preventDefault();
        Meteor.call(
            'move.right',
            player._id
        );
    };

    moveLeft = () => {
        event.preventDefault();
        Meteor.call(
            'move.left',
            player._id
        );
    };

    render() {
        return <div className='root'>
            <div className='buttonRow' style={rowStyle}>
                <MoveLeftButton moveLeft={this.moveLeft} />
                <MoveRightButton moveRight={this.moveRight} />
            </div>
        </div>
    }
}

export default Controller;