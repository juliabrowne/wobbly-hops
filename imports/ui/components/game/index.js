import React from "react";
import Phaser from "phaser";

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.game = new Phaser.Game({
      width: window.innerWidth,
      height: window.innerHeight,
      type: Phaser.AUTO,
      parent: "phaser-container",
      physics: {
        default: "arcade",
        debug: false
      },
      scene: {
        create: function() {
          const platforms = this.game.add.group();
          platforms.create(300, 600, "test");
        },
        update: function() {}
      }
    });
  }

  render() {
    return <div id="phaser-container" />;
  }
}

export default Game;
