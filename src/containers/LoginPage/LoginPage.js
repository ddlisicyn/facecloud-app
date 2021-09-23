import React from 'react';
import { LoginForm } from '../../components/Form';
import { login } from '../../api/services/auth';
import { registration } from '../../api/services/registration';
import { setItem } from '../../api/services/localStorage';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';

const { core, profile } = routes;

export function LoginPage() {
    const history = useHistory();

	const authentication = (credentials) => {
        login(credentials)
            .then(response => {
                alert('You are loged in successfully!');
                setItem(response.data.access_token);
                history.push(profile);
            });
    }

    const register = (credentials) => {
        credentials.billing_type = 'demo';
        registration(credentials)
            .then(response => alert(response.message));
    }

    return (
        <div className="d-flex justify-content-center">
			<LoginForm 
                authentication={authentication} 
                register={register} />
        </div>
    )
}
