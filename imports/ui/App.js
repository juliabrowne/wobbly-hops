import React from 'react';
import IntroContainer from '../ui/pages/intro';
import Layout from '../../routes/layout';
import { BrowserRouter as Router } from 'react-router-dom';

import { Players } from '../api/players';
import { Gameboard } from '../api/gameboard';

const App = () => (
    <Router>
        <Layout />
    </Router>
);

export default App;
