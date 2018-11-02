import React from 'react';
import IntroContainer from '../ui/pages/intro';
import Layout from '../../routes/layout';
import { BrowserRouter as Router } from 'react-router-dom';

import { Players } from '../api/players';

const App = () => (
    <Router>
        <Layout />
    </Router>
);

export default App;
