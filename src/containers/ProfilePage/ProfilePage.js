import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import cn from 'classnames';
import { getLists, createDB, getPersons } from '../../api/services/database';
import { deletePers, updatePers } from '../../api/services/person';
import { PersonCard } from './PersonCard';
import { useHistory } from 'react-router';
import { routes } from '../../constants/routes';
import style from './ProfilePage.module.css';

export function ProfilePage() {
	const [databaseId, setDatabaseId] = useState(0);
	const [persons, setPersons] = useState([]);
	const history = useHistory();

	useEffect(() => {
		getLists()
		.then(response => {
			if (response.data[0]) setDatabaseId(response.data[0].id)
		});
	}, []);

	useEffect(() => {
		if (databaseId) {
			getPersons(databaseId)
				.then(response => setPersons(response.data));
		}
	}, [databaseId]);

	const handleCreateDB = () => {
		createDB()
			.then(response => {
				setDatabaseId(response.data.id);
				alert(response.message);
			});
	}
	
	const deletePerson = (personId) => {
		deletePers(personId)
			.then(response => {
				console.log(response.message);
				getPersons(databaseId)
					.then(response => setPersons(response.data));
			});
	}

	const updatePerson = (personId, personData) => {
        updatePers(personId, personData)
            .then(response => {
				alert(response.message)
				getPersons(databaseId)
					.then(response => setPersons(response.data));
			});
    }

	const onUploadClick = () => {
		history.push(routes.upload);
	}

    return (
		<div>
			{
				databaseId ?
				<> 	
					<div style={{ margin: '1%' }} >
						<Button onClick={onUploadClick}>Upload new photo</Button>
					</div>
					<div className={cn(style.wrapper)}>
						<div className={cn('mt-5', style.container)} style={{ width: '100%' }}>
							{
							persons.length ? persons.map(person => (
									<PersonCard 
										key={person.id}
										data={person}
										deletePerson={deletePerson}
										updatePerson={updatePerson}
									/>
							)) : <p style={{ margin: '1%' }}>No person has been created yet</p>
							}
						</div>
					</div>
				</>
				: 	<Button style={{ margin: '1%' }}
						variant="primary"
						onClick={handleCreateDB}
					>Create new database</Button>
			}
	  	</div>
    )
}
