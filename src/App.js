/* eslint-disable */
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { ProfilePage } from './containers/ProfilePage/ProfilePage';
import { routes } from './constants/routes';

const { core, profile } = routes;

function App() {
    return (
      <Router>
          <Switch>
              <Route path={profile}>
                  <ProfilePage />
                </Route>
              <Route path={core}>
                  <LoginPage />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
