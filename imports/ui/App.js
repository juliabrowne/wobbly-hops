<<<<<<< HEAD
import React, { Component } from "react";
import Game from "../ui/components/game";
import Canvas from "../ui/components/canvas";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../../routes/layout";
=======
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import Layout from '../../routes/layout'
>>>>>>> 505d81ae4bc66cda75c2c711b6cb80890e944569

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
