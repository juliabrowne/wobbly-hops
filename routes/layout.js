import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import IntroContainer from "../imports/ui/pages/intro/IntroContainer";
import InstructionContainer from "../imports/ui/pages/instructions/InstructionContainer";
import createCharContainer from "../imports/ui/pages/createChar/createCharContainer";
import lobbyContainer from "../imports/ui/pages/lobby/lobbyContainer";
import Canvas from "../imports/ui/components/canvas";
import Controller from "../imports/ui/components/controller";
import endGame from "../imports/ui/pages/endGame/endGame";

export default () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/intro" component={IntroContainer} />
        <Route exact path="/instructions" component={InstructionContainer} />
        <Route exact path="/createCharacter" component={createCharContainer} />
        <Route exact path="/game" component={Canvas} />
        <Route exact path="/controller" component={Controller} />
        <Route exact path="/lobby" component={lobbyContainer} />
        <Route exact path="/endGame" component={endGame} />
        <Redirect from="*" to="/intro" />
      </Switch>
    </Fragment>
  );
};
