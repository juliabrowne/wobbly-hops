import React, { Component } from "react";
import "./styles.css";
import ReactAudioPlayer from "react-audio-player";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Link } from "react-router-dom";
import { CompactPicker } from 'react-color';

const SubmitButton = ({ addPlayer }) => {
  return <button className="submit" onClick={() => addPlayer()}>Lets Play!</button>;
};

class createCharContainer extends Component {
  constructor() {
    super();
    this.nameInput = React.createRef();
    this.colorInput = React.createRef();
  }



  addPlayer = () => {
    event.preventDefault();
    let nameInput = this.nameInput.current;
    let colorInput = this.colorInput.current;
    if (nameInput.value && colorInput.value) {
      Meteor.call(
        "add.player",
        this.nameInput.current.value,
        this.colorInput.current.value,
        Meteor.userId()
      );
    }
  };


  render() {
    return <div className="root">
        <ReactAudioPlayer src="../../../music/bensound-allthat.mp3" autoPlay loop />
        <Link to="/intro">
          <h1 className="header">W🤪BBLY-H🤮PS🍻</h1>
        </Link>
        <form onSubmit={this.addPlayer} className="inputDiv">
          <h2 className="name-header">What's ya' name?</h2>
          <input type="text" className="input" maxLength="12" ref={this.nameInput} />
          <h2 className="name-header">What's ya' favorite color?</h2>
          <h4 className="center">(Click to Change)</h4>
          <div className="center">
            <CompactPicker className="color-select" ref={this.colorInput} />
          </div>
          <div className="center">
            <SubmitButton addPlayer={this.addPlayer} />
          </div>
        </form>
        <div id="bubbles">
          <div className="bubble x1" />
          <div className="bubble x2" />
          <div className="bubble x3" />
          <div className="bubble x4" />
          <div className="bubble x5" />
          <div className="bubble x6" />
          <div className="bubble x7" />
          <div className="bubble x8" />
          <div className="bubble x9" />
          <div className="bubble x10" />
        </div>
      </div>;
  }
}


export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  return {
    loading: handle.ready(),
    player: Players.find().fetch()
  };
})(createCharContainer);
