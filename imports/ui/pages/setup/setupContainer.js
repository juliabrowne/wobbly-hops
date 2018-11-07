import React, { Component } from "react";
import './styles.css'
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

class setupContainer extends Component {
    render() {
        return <div className="root">
            {/* Music taken from www.Bensound.com and is Non-Copyrighted*/}
            <ReactAudioPlayer src="../../../music/bensound-allthat.mp3" autoPlay loop />
            <Link to="/intro">
                <h1 className="header">
                    W<span className="span">🤪</span>
                    BBLY-H<span className="span">🤮</span>PS🍻
          </h1>
            </Link>
            <Link to="/game">
                <button className="setup-button">START GAME</button>
            </Link>
            <h2 className="players-header">Players in Lobby:</h2>
            <div className="players-list">
              <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
                <li>Four</li>
              </ul>
            </div>
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

export default setupContainer