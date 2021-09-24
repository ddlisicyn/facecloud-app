import React, { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { getLists, createDB, getPersons } from '../../api/services/database';
import { Header } from '../../components/Header';
import { PhotoUpload } from '../../components/PhotoUpload';
import { detect } from '../../api/services/stateless';
import { PhotoRedactor } from '../../components/PhotoRedactor';
import { createPers, deletePers } from '../../api/services/person';
import { createPhoto } from '../../api/services/photo';
import { Person } from '../../components/PersonCard';
import { deleteUserData } from '../../api/services/sessionService';
import { useHistory } from 'react-router';

export function ProfilePage() {
	const [databaseId, setDatabaseId] = useState(0);
	const [personId, setPersonId] = useState(0);
	const [persons, setPersons] = useState([]);
	const [photo, setPhoto] = useState();
	const [bbox, setBbox] = useState({});
	const [facesData, setFacesData] = useState([]);
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

	useEffect(() => {
		if (bbox?.x) {
		createPhoto(photo, personId, bbox)
			.then(response => console.log(response));
		}
	}, [photo, personId, bbox]);

	const handleCreateDB = () => {
		createDB()
			.then(response => {
				setDatabaseId(response.data.id);
				alert(response.message);
			});
	}

	const uploadPhoto = (data) => {
		setPhoto(data.photo[0]);
		detect(data.photo[0])
			.then(response => setFacesData(response.data));
	}

	const createPerson = (personData, bbox) => {
		personData.database_id = databaseId;
		createPers(personData)
			.then(response => {
				setPersonId(response.data.id);
				setBbox(bbox);
				alert(response.message);
				getPersons(databaseId)
					.then(response => setPersons(response.data));
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

	const logout = () => {
		deleteUserData();
		history.goBack();
	}

    return (
		<div style={{ margin: '2%' }}>
			<Header logout={logout} />
			{
				databaseId ?
				<> 	
					<ListGroup className="mt-5" style={{ width: '100%', maxHeight: '50vh', overflowY: 'auto' }}>
						{
						persons.length ? persons.map(person => (
							<ListGroup.Item key={person.id}>
								<PersonCard 
									data={person}
									deletePerson={deletePerson} 
								/>
							</ListGroup.Item>
						)) : 'No person'
						}
					</ListGroup>
					<div className="mt-5">
					<PhotoUpload uploadPhoto={uploadPhoto} />
					{
						photo ? <PhotoRedactor photo={photo} faces={facesData} createPerson={createPerson} /> : ''
					}
					</div>
				</>
				: 	<Button 
						variant="primary"
						onClick={handleCreateDB}
					>Create new database</Button>
			}
	  	</div>
    )
}
