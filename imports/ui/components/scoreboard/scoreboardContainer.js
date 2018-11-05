import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

class ScoreboardContainer extends Component {
    render() {
        return (
            <div className="groot">
                <div className="scoreboard">
                    <h1>Player Name</h1>
                    <h3>Color:</h3>
                    <h3>X</h3>
                <h3>Lives left:</h3>
                <h3>X</h3>
                <h3>Drink Timer:</h3>
                <h3>XX:XX</h3>
                </div>
            </div>
        )
    }
}

export default ScoreboardContainer;