import React from 'react';
import { Face } from './Face';

export function PhotoRedactor({ photo, faces, createPerson }) {
    return (
        <div style={{ position: 'relative' }} className="d-flex justify-content-center">
            <div style={{ position: 'relative' }} className="d-flex flex-direction-column">
                <img src={URL.createObjectURL(photo)} alt="person-img" ></img>
                {
                    faces.length ? faces.map((face, index) => (
                        <Face 
                            key={photo.size + index} 
                            bbox={face.bbox} 
                            demographics={face.demographics} 
                            createPerson={createPerson}
                        />
                    )) : ''
                }
            </div>
        </div>
        
    )
}