import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom'

function ReviewModal({ reviews, setReviews }) {

    const { restaurant_id } = useParams();

    const [show, setShow] = useState(false);

    const [addReview, setAddReview] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddReview = (e) => {
        e.preventDefault()
        fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify([addReview, restaurant_id]),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then(data => {
                setReviews(data)
                console.log(data)
            });
        handleClose()

    };


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add A Review
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Your review here ... </Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setAddReview({ ...addReview, review: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddReview}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReviewModal;