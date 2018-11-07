import React, {
    Component
} from "react";
import './styles';
import {
    withTracker
} from "meteor/react-meteor-data";
import {
    Players
} from "../../../api/players";


class Controller extends Component {
    constructor() {

    }

    render() {
        return <div className='root'>
            <Link to='/intro'>
              <p className="return">Return to front page!</p>
            </Link>

            <button onClick={this.moveRight} className='rightButton'></button>


            <button onClick={this.moveLeft} className='leftButton'> </button>
            </div>
      }


}