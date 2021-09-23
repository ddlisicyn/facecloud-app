import React from 'react';
import { Button } from 'react-bootstrap';

export function Header() {
    return (
        <div className="d-flex justify-content-between">
            <h1>Face Cloud</h1>
            <Button variant="outline-danger">Logout</Button>
        </div>
    )
}