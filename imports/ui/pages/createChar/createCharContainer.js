import React, { Component } from "react";
import "./styles.css";
import ReactAudioPlayer from "react-audio-player";
import { withTracker } from "meteor/react-meteor-data";
import { Players } from "../../../api/players";
import { Link } from "react-router-dom";

const SubmitButton = ({ addPlayer }) => {
  return <button onClick={() => addPlayer()}>Lets Play!</button>;
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
    return (
      <div className="root">
        <ReactAudioPlayer
          src="../../../music/bensound-allthat.mp3"
          autoPlay
          loop
        />
        <Link to="/intro">
          <h1 className="header">W🤪BBLY-H🤮PS🍻</h1>
        </Link>
        <form onSubmit={this.addPlayer} className="inputDiv">
          <h2 className="name-header">What's ya' name?</h2>
          <input
            type="text"
            className="input"
            maxLength="12"
            ref={this.nameInput}
          />
          <h2 className="name-header">What's ya' favorite color?</h2>
          <input
            className="color-select"
            type="color"
            defaultValue="#ff0000"
            ref={this.colorInput}
          />

          <SubmitButton className="submit" addPlayer={this.addPlayer} />
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
          <div className="bubble x11" />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe("players");
  return {
    loading: handle.ready(),
    player: Players.find().fetch()
  };
})(createCharContainer);
