import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function PhotoUpload({ uploadPhoto }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        uploadPhoto(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{width: "25%"}}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload your photo</Form.Label>
                <Form.Control {...register('photo', { required: true })} name="photo" type="file" accept=".jpg, .jpeg, .png" />
            </Form.Group>
            <Button type="submit">Upload</Button>
        </Form>
    )
}