import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { Routes } from './containers/Routes';

function App() {
    return (
        <Router>
            <Routes />
        </Router>
    )
}

export default App;
