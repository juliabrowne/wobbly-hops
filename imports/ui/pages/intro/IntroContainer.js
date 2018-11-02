import React, { Component } from "react";
import './styles.css'

class IntroContainer extends Component {
    render() {
      return <div className="root">
          <h1 className="header">W🤪BBLY-H🤮PS🍻</h1>
          <button className="start-button">Start</button>
          <button className="start-button">The Rules</button>
          <div id="bubbles">
            <div className="bubble x1" />
            <div className="bubble x2" />
            <div className="bubble x3" />
            <div className="bubble x4" />
            <div className="bubble x5" />
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
            <div className="bubble x11" />
          </div>
        </div>;
    }
}

export default IntroContainer