import React, { useState } from 'react';
import { Modal, 
    Button, 
    InputGroup, 
    FormControl,
    ButtonGroup, 
    ToggleButton 
} from 'react-bootstrap';

const radios = [
    { name: 'male', value: 'male' },
    { name: 'female', value: 'female' }
];

export function EditModal({ modalVisibility, handleClose, data, editPerson }) {
    const { data: { person_data }, id } = data;
    const { age, gender, lastName, firstName, patronymicName } = person_data[0];
	const [personData, setPersonData] = useState(person_data[0]);
    const [radioValue, setRadioValue] = useState(gender);

    const handleChange = ({ target: { name, value} }) => {
        setPersonData((lastPersonData) => ({
            ...lastPersonData,
            [name]: value
        }))
    }

    const handleEdit = () => {
        if (personData.lastName && personData.firstName && personData.patronymicName) {
            personData.age = age;
            personData.gender = radioValue;
			editPerson(id, {
                data: {
                    person_data: [personData]
                }
            });
		} else {
			alert('Please, fill in form fields!');
		}
    }

    return (
      <>
        <Modal show={modalVisibility} onHide={handleClose}>
            <Modal.Header closeButton>
                Edit person
            </Modal.Header>
            <Modal.Body>
              	<InputGroup>
                    <FormControl 
                        onChange={handleChange} 
                        name='lastName'
                        className='mt-1' 
                        placeholder='Last Name'
                        value={personData.lastName}
                    />
                    </InputGroup>
				<InputGroup>
					<FormControl 
						onChange={handleChange} 
						name='firstName'
						className='mt-1' 
						placeholder='First Name'
						value={personData.firstName}
					/>
				</InputGroup>
				<InputGroup>
					<FormControl 
						onChange={handleChange} 
						name='patronymicName' 
						className='mt-1'
						placeholder='Patronymic Name'  
						value={personData.patronymicName}
					/>
				</InputGroup>
                <ButtonGroup className='mt-2'>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type='radio'
                        name='radio'
                        variant={idx % 2 ? 'outline-danger' : 'outline-primary'}
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        <i className={`bi bi-gender-${radio.name}`}></i>
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleEdit}>
                    Save Changes
                </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}