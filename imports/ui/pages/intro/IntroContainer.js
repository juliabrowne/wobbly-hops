import React, { Component } from "react";
import './styles.css'
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

class IntroContainer extends Component {
    render() {
      return <div className="root">
          {/* Music taken from www.Bensound.com and is Non-Copyrighted*/}
          <ReactAudioPlayer src="../../../music/bensound-funday.mp3" autoPlay loop />
          <h1 className="header">W🤪BBLY-H🤮PS🍻</h1>
          <button className="start-button">Start</button>
          <Link to="/instructions">
            <button className="start-button" to="/instructions">
              The Rules
            </button>
          </Link>
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
        </div>;
    }
}

export default IntroContainer