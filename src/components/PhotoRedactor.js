import React, { useRef, useEffect, useState } from 'react';
import { Face } from './Face';
import { getSize } from '../api/services/fileReader';

export function PhotoRedactor({ photo, faces, createPerson }) {
    return (
        <div style={{ position: 'relative', marginTop: '2%' }}>
            <img
                src={URL.createObjectURL(photo)} 
                alt='person-img'
            >
            </img>
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
    )
}