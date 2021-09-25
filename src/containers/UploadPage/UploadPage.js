import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { routes } from '../../constants/routes';
import { detect } from '../../api/services/stateless';
import { getLists } from '../../api/services/database';
import { createPers } from '../../api/services/person';
import { createPhoto} from '../../api/services/photo';
import { PhotoUpload } from '../../components/PhotoUpload';
import { PhotoRedactor } from '../../components/PhotoRedactor';
import style from './UploadPage.module.css';
import cn from 'classnames';

export function UploadPage() {
	const [photo, setPhoto] = useState();
	const [bbox, setBbox] = useState({});
	const [personId, setPersonId] = useState(0);
	const [facesData, setFacesData] = useState([]);
	const [databaseId, setDatabaseId] = useState(0);
	const history = useHistory();

	useEffect(() => {
		getLists()
		.then(response => {
			if (response.data[0]) setDatabaseId(response.data[0].id)
		});
	}, []);

	useEffect(() => {
		if (bbox?.x) {
		createPhoto(photo, personId, bbox)
			.then(response => console.log(response.message));
		}
	}, [photo, personId, bbox]);

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

	const onBack = () => {
		history.push(routes.profile);
	}

	return (
		<div style={{ margin: '1%' }}>
			<Button onClick={onBack}>
				Back to profile
			</Button>
			<PhotoUpload uploadPhoto={uploadPhoto} />
				{
					photo ? <PhotoRedactor photo={photo} faces={facesData} createPerson={createPerson} /> : ''
				}
		</div>
	);
};
