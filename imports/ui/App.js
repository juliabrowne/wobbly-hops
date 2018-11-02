import React, { Component } from "react";
import Game from "../ui/components/game";
import Canvas from "../ui/components/canvas";

class App extends Component {
  constructor() {
    super();
  }

  windowOnLoad() {}

  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}
