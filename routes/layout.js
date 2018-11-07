import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import IntroContainer from '../imports/ui/pages/intro'
import InstructionContainer from "../imports/ui/pages/instructions/InstructionContainer";
import createCharContainer from '../imports/ui/pages/createChar/createCharContainer'
import setupContainer from "../imports/ui/pages/setup/setupContainer";
import Canvas from "../imports/ui/components/canvas";
import Controller from "../imports/ui/components/controller";

export default () => {
    return <Fragment>
        <Switch>
          <Route exact path="/intro" component={IntroContainer} />
          <Route exact path="/instructions" component={InstructionContainer} />
          <Route exact path="/createCharacter" component={createCharContainer} />
          <Route exact path="/game" component={Canvas} />
        <Route exact path="/controller" component={Controller} />
        <Route exact path="/setup" component={setupContainer} />
          <Redirect from="*" to="/intro" />
        </Switch>
      </Fragment>;
}

