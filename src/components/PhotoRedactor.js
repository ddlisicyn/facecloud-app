import React, { useRef, useEffect, useState } from 'react';
import { Face } from './Face';
import { getSize } from '../api/services/fileReader';
import style from './PhotoRedactor.module.css';
import cn from 'classnames';

export function PhotoRedactor({ photo, faces, createPerson }) {
    const imgRef = useRef(null);
    const [realSize, setRealSize] = useState({});
    const [DOMSize, setDOMSize] = useState({});
    const [diff, setDiff] = useState({});

    const preparePhoto = (width, height) => {
        setRealSize({
            width, height
        });
    };

    useEffect(() => {
        if (photo) {
            getSize(photo, preparePhoto);
            setDOMSize({
                width: imgRef?.current.width,
                height: imgRef?.current.height});
        }
    }, [photo]);

    useEffect(() => {
        if (realSize?.width && DOMSize?.width) {
            const diffX = (DOMSize.width / realSize.width);
            const diffY = (DOMSize.height / realSize.height);
            setDiff({diffX, diffY});
        }
    }, [realSize, DOMSize]);

    return (
        <div className={cn(style.img)}>
            <img ref={imgRef}
                src={URL.createObjectURL(photo)} 
                alt="person-img" ></img>
            {
                faces.length ? faces.map((face, index) => (
                    <Face 
                        key={photo.size + index}
                        realSize={realSize}
                        diff={diff}
                        bbox={face.bbox} 
                        demographics={face.demographics} 
                        createPerson={createPerson}
                    />
                )) : ''
            }
        </div>
    )
}