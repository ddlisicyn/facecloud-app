import React from 'react';
import { LoginForm } from '../../components/Form';
import { login } from '../../api/services/auth';
import { registration } from '../../api/services/registration';

export function LoginPage() {
	const authentication = (credentials) => {
        login(credentials)
            .then(response => {
                alert('You are loged in successfully!');
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
