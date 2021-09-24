import React from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { LoginPage } from './LoginPage/LoginPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { UploadPage } from './UploadPage/UploadPage';
import { getItem } from '../api/services/localStorage';
import { routes } from '../constants/routes';
import { Header } from '../components/Header';
import { deleteUserData } from '../api/services/sessionService';

const {core, profile, upload} = routes;

const shouldShowHeader = (pathname) => (
    [routes.profile, routes.upload].includes(pathname)
);

export const Routes = () => {
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
		deleteUserData();
		history.goBack();
	}

    const withRedirect = (Component) => (props) => {
        if (!getItem()) {
            return <Redirect to={core} />
        }

        return <Component {...props} />;
    }
    
    return (
        <>
            {shouldShowHeader(location.pathname) && (
                <Header logout={logout} />
            )}
            <Switch>
                <Route exact path={core}>
                    <LoginPage />
                </Route>
                <Route 
                    path={upload} 
                    component={withRedirect(UploadPage)}
                />
                <Route 
                    path={profile} 
                    component={withRedirect(ProfilePage)}
                />
                <Route render={() => <Redirect to={core}/>}/>
            </Switch>
        </>
    )
}