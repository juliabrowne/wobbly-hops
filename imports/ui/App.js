import React, { Component } from "react";
import Game from "../ui/components/game";
import Canvas from "../ui/components/canvas";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../../routes/layout";

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
