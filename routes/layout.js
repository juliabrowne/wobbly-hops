import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import IntroContainer from '../imports/ui/pages/intro'

export default () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/intro" component={IntroContainer} />
                <Redirect from="*" to="/intro"/>
            </Switch>
        </Fragment>
    )
}

