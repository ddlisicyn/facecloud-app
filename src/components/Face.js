import React, { useState } from 'react';
import { OverlayTrigger, 
    Popover, 
    InputGroup, 
    FormControl, 
    Button,
    ButtonGroup,
    ToggleButton } from 'react-bootstrap';

const radios = [
    { name: 'male', value: 'male' },
    { name: 'female', value: 'female' }
];

export function Face({ realSize, diff, bbox, demographics, createPerson }) {
    const { x, y, width, height} = bbox;
    const { age: {mean}, gender } = demographics;
    const [personData, setPersonData] = useState({});
    const [radioValue, setRadioValue] = useState(gender);

    const top = (x / realSize.width) * 100;
    const left = (y / realSize.height) * 100;

    const handleChange = ({ target: { name, value} }) => {
        setPersonData((lastPersonData) => ({
            ...lastPersonData,
            [name]: value
        }))
    }

    const handleClick = () => {
        if (personData.lastName && personData.firstName && personData.patronymicName) {
            personData.age = mean;
            personData.gender = radioValue;
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
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                name="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                <i className={`bi bi-gender-${radio.name}`}></i>
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
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
                top: `${top}%`,
                left: `${left}%`,
                width: width,
                height: height,
                border: '3px solid gray'
            }} />
        </OverlayTrigger>
    )
}