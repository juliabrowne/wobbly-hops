import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

class InstructionContainer extends Component {
    render() {
        return <div className="root">
            {/* Music taken from www.Bensound.com and is Non-Copyrighted)*/}
            <ReactAudioPlayer src="../../../music/bensound-allthat.mp3" autoPlay loop />
            <h1 className="header">W🤪BBLY-H🤮PS🍻</h1>
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
            <div className="rundown">
              <h2 className="rundown">The Run-down</h2>
            </div>
            <div className="instructions">
              <ul>
                <li>You start with 3 lives.</li>
                <li>
                  The beer is going to be rising.. Dont touch it! You
                  will lose a life!
                </li>
                <li>
                  Every life lost will sentence you to the DRUNK TANK.
                  Don't worry, we'll pause the game while you drink.
                </li>
                <li>
                  There will be platforms falling that you can jump
                  between to avoid falling into the Beer Pit.. but
                  beware! Players can push eachother.
                </li>
                <li>Losing all 3 lives will result in ELIMINATION.</li>
              </ul>
            </div>
            <Link to="/intro">
              <button className="instructions-back">Back</button>
            </Link>
          </div>;
    }
}

export default InstructionContainer