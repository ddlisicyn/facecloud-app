import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { ProfilePage } from './containers/ProfilePage/ProfilePage';
import { routes } from './constants/routes';
import { isLoggedIn } from './api/services/auth';

const { core, profile } = routes;

function App() {

    const withRedirect = () => {
        if (!isLoggedIn) return <Redirect to={core} />
    }

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
