import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import RestaurantPhotos from './RestaurantPhotos'

function ReviewModal({ restaurant, setRestaurant, reviews, setReviews }) {

    const { restaurant_id } = useParams();

    const [show, setShow] = useState(false);

    const [addReview, setAddReview] = useState(null);

    const ratingChanged = (newRating) => {
        setAddReview({ ...addReview, rating_score: newRating })
        console.log(newRating);
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddReview = (e) => {
        e.preventDefault()
        fetch('/api/add-reviews', {
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
        window.location.reload()

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
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                    <RestaurantPhotos restaurant={restaurant} setRestaurant={setRestaurant} />
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Write a review... </Form.Label>
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