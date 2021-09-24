import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getPhotos } from '../../api/services/person';
import { getFace } from '../../api/services/photo';
import style from './PersonCard.module.css';
import cn from 'classnames';
import { EditModal } from '../../components/EditModal';

export function PersonCard({ data, deletePerson, updatePerson }) {
    const [photo, setPhoto] = useState();
    const [modalVisibility, setModalVisibility] = useState(false);
    const { data: { person_data }, id } = data;
    const { age, gender, lastName, firstName, patronymicName } = person_data[0];

    useEffect(() => {
        getPhotos(id)
            .then(response => getFace(response.data[0].id)
                .then(response => setPhoto(URL.createObjectURL(response))));
    }, [id]);

    const redactorPerson = () => {
        setModalVisibility(true);
    }

    const handleClose = () => setModalVisibility(false);

    return (
        <Card style={{ width: '14rem' }} className={cn(style.card)}>
            <div className={cn(style.img__wrapper)}>
                <Card.Img variant="top" src={photo} />
            </div>
                <Card.Body>
                    <Card.Text className={cn(style.text)}>
                        {lastName}<br/>
                        {firstName}<br/>
                        {patronymicName}<br/>
                        Age: {age}<br/>
                        Gender: {gender}
                    </Card.Text>
                    <div className="d-flex justify-content-between" style={{width: '100px'}}>
                        <Button 
                            onClick={redactorPerson}
                            variant="outline-warning"
                        ><i className="bi bi-pencil-fill"></i></Button>
                        <Button 
                            onClick={() => deletePerson(id)}
                            variant="outline-danger"
                        ><i className="bi bi-trash"></i></Button>
                    </div>
            </Card.Body>
            <EditModal 
                modalVisibility={modalVisibility} 
                handleClose={handleClose} 
                data={data}
                editPerson={updatePerson}
                />
        </Card>
    )
}