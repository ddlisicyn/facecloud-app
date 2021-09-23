import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getLists, createDB } from '../../api/services/database';
import { Header } from '../../components/Header';
import { PhotoUpload } from '../../components/PhotoUpload';
import { detect } from '../../api/services/stateless';
import { PhotoRedactor } from '../../components/PhotoRedactor';
import { createPers } from '../../api/services/person';
import { createPhoto } from '../../api/services/photo';

export function ProfilePage() {
	const [databaseId, setDatabaseId] = useState(0);
	const [personId, setPersonId] = useState(0);
	const [photo, setPhoto] = useState();
	const [bbox, setBbox] = useState({});
	const [facesData, setFacesData] = useState([]);

	useEffect(() => {
		getLists()
		.then(response => {
			if (response.data[0]) setDatabaseId(response.data[0].id)
		});
	}, []);

	useEffect(() => {
		createPhoto(photo, personId, bbox)
			.then(response => console.log(response));
	}, [personId]);

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
			});
	}
	
    return (
		<>
			<Header />
			{
				databaseId ?
				<> 
					<PhotoUpload uploadPhoto={uploadPhoto} />
					{
						photo ? <PhotoRedactor photo={photo} faces={facesData} createPerson={createPerson} /> : ''
					}
					
				</>
				: 	<Button 
						variant="primary"
						onClick={handleCreateDB}
					>Create new database</Button>
			}
	  	</>
    )
}
