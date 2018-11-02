import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import IntroContainer from '../imports/ui/pages/intro'
import InstructionContainer from "../imports/ui/pages/instructions/InstructionContainer";
import createCharContainer from '../imports/ui/pages/createChar/createCharContainer'

export default () => {
    return <Fragment>
        <Switch>
          <Route exact path="/intro" component={IntroContainer} />
          <Route exact path="/instructions" component={InstructionContainer} />
          <Route exact path="/createCharacter" component={createCharContainer} />
          <Redirect from="*" to="/intro" />
        </Switch>
      </Fragment>;
}

