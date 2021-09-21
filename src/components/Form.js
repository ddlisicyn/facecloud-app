import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function LoginForm({ authentication, register }) {
	const [inputs, setInputs] = useState({
		email: '',
		password: ''
	});

	const handleChange = ({ target: { name, value } }) => {
		setInputs({
			...inputs,
			[name]: value
		})
	}

	const handleClick = (e) => {
		const actionType = e.target.name;

		if (inputs.email && inputs.password) {
			actionType === 'auth' ? authentication(inputs) : register(inputs);
			setInputs({
				email: '',
				password: ''
			});
		} else {
			alert('Заполните все поля!');
		}

	}

    return (
     	 <Form onSubmit={(e) => e.preventDefault()}>
          	<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control onChange={handleChange} name="email" placeholder="Enter email" value={inputs.email} />
				<Form.Text className="text-muted">
                 	 We will never share your email with anyone else.
                </Form.Text>
            </Form.Group>
          	<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={handleChange} name="password" placeholder="Password" value={inputs.password} />
				<Form.Text id="passwordHelpBlock" muted>
					Your password must be 8-256 characters long, contain letters and numbers, and
					must not contain spaces, special characters, or emoji.
				</Form.Text>
            </Form.Group>
			<Button
				onClick={handleClick}
				variant="success"
				name="auth"
				type="submit"
			>
				Log in
			</Button>
			<Button
				onClick={handleClick}
				variant="primary"
				name="register"
				type="submit"
			>
				Register
			</Button>
        </Form>
    )
}
