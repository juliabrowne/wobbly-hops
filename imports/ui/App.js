import React, { Component } from "react";
import Game from "../ui/components/game";
import Canvas from "../ui/components/canvas";

import { Players } from '../api/players';
import { Gameboard } from '../api/gameboard';

const App = () => (
    <Router>
        <Layout />
    </Router>
);

export default App;
