import React, { useState } from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

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
			if (isValidEmal(inputs.email)) {
				if (isValidPass(inputs.password)) {
				actionType === 'auth' ? authentication(inputs) : register(inputs);
				setInputs({
					email: '',
					password: ''
				});
				} else {
					alert('Not valid password');
				}
			} else {
				alert('Not valid email');
			}
		} else {
			alert('Please, fill in form fields!');
		}
	}

	const isValidEmal = (email) => {
		return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
	}

	const isValidPass = (pass) => {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pass);
	}

    return (
     	 <Form className='mt-5' onSubmit={(e) => e.preventDefault()}>
          	<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control onChange={handleChange} name='email' placeholder='Enter email' value={inputs.email} />
				<Form.Text className='text-muted'>
                 	 We will never share your email with anyone else.
                </Form.Text>
            </Form.Group>
          	<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={handleChange} name='password' placeholder='Password' value={inputs.password} />
				<Form.Text className='text-muted'>
				Password should be 6-20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.
                </Form.Text>
            </Form.Group>
			<div className='d-flex justify-content-between'>
				<Button
					onClick={handleClick}
					variant='success'
					name='auth'
					type='submit'
				>
					Log in
				</Button>
				<Button
					onClick={handleClick}
					variant='primary'
					name='register'
					type='submit'
				>
					Register
				</Button>
			</div>
        </Form>
    )
}
