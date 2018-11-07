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
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

const MoveRightButton = ({ moveRight }) => {
    return <button className='rightButton' onClick={() => moveRight()}><img src='./../../../controllerImages/rightArrow.png' /></button>;
};
const MoveLeftButton = ({ moveLeft }) => {
    return <button className='leftButton' onClick={() => moveLeft()}><img src='./../../../controllerImages/leftArrow.png' /></button>;
};

class Controller extends Component {
    constructor() {
        super();
    }

    moveRight = () => {
        event.preventDefault();
        Meteor.call(
            'move.right',
            Meteor.userId()
        );
    };

    moveLeft = () => {
        event.preventDefault();
        Meteor.call(
            'move.left',
            Meteor.userId()
        );
    };

    render() {
        return <div className='root'>
            <div className='buttonRow'>
                <MoveLeftButton moveLeft={this.moveLeft} />
                <MoveRightButton moveRight={this.moveRight} />
            </div>

            <Link to='/intro'>
              <p className="return">Return to front page!</p>
            </Link>
        </div>
    }
}


export default Controller;