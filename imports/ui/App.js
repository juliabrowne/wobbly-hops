import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import Layout from '../../routes/layout'


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}

import { Players } from '../api/players';

const App = () => (
    <Router>
        <Layout />
    </Router>
);


export default App;
