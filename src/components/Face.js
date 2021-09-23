import React, { useState } from 'react';
import { OverlayTrigger, Popover, InputGroup, FormControl, Button } from 'react-bootstrap';

export function Face({ bbox, demographics, createPerson }) {
    const [personData, setPersonData] = useState({});

    const { x, y, width, height} = bbox;
    const { age: {mean}, gender } = demographics;

    const handleChange = ({ target: { name, value} }) => {
        setPersonData({
            ...personData,
            age: mean,
            gender,
            [name]: value
        })
    }

    const handleClick = () => {
        if (personData.lastName && personData.firstName && personData.patronymicName) {
			createPerson({
                data: {
                    person_data: [personData]
                }
            }, bbox);
			setPersonData({
				lastName: '',
				firstName: '',
                patronymicName: ''
			});
		} else {
			alert('Заполните все поля!');
		}
    }

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover id="popover-basic">
                <Popover.Body>
                    <div className="d-flex flex-direction-row justify-content-between">
                        <p><b>Age: {mean}</b></p>
                        <i className={`bi bi-gender-${gender}`}></i>
                    </div>
                    <InputGroup>
                        <FormControl 
                        onChange={handleChange} 
                        name="lastName" 
                        className="mt-1" 
                        placeholder="Last Name"
                        value={personData.lastName}
                    />
                    </InputGroup>
                    <InputGroup>
                        <FormControl 
                        onChange={handleChange} 
                        name="firstName" 
                        className="mt-1" 
                        placeholder="First Name"
                        value={personData.firstName}
                    />
                    </InputGroup>
                    <InputGroup>
                        <FormControl 
                        onChange={handleChange} 
                        name="patronymicName" 
                        className="mt-1" 
                        placeholder="Patronymic Name"  
                        value={personData.patronymicName}
                    />
                    </InputGroup>
                    <Button onClick={handleClick} className="mt-1">Create person</Button>
                </Popover.Body>
            </Popover>
        }
        >
            <div style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
                border: '3px solid gray'
            }} />
        </OverlayTrigger>
    )
}