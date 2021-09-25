import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import style from './Header.module.css';
import cn from 'classnames';

export function Header({ logout }) {
    return (
        <div className={cn('d-flex', 'justify-content-between', style.header)}>
            <h1>Face Cloud</h1>
            <Button 
                variant='outline-danger'
                onClick={logout}
            >Logout</Button>
        </div>
    )
}