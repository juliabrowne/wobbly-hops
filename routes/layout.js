import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import IntroContainer from "../imports/ui/pages/intro/IntroContainer";
import InstructionContainer from "../imports/ui/pages/instructions/InstructionContainer";
import createCharContainer from "../imports/ui/pages/createChar/createCharContainer";
import lobbyContainer from "../imports/ui/pages/lobby/lobbyContainer";
import Game from "../imports/ui/components/game";
import endGame from "../imports/ui/pages/endGame/endGame";
import Nipple from "../imports/ui/components/nipple";

export default () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/intro" component={IntroContainer} />
        <Route exact path="/instructions" component={InstructionContainer} />
        <Route exact path="/createCharacter" component={createCharContainer} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/lobby" component={lobbyContainer} />
        <Route exact path="/endGame" component={endGame} />
        <Route exact path="/joystick" component={Nipple} />
        <Redirect from="*" to="/intro" />
      </Switch>
    </Fragment>
  );
};
