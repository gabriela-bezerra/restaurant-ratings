import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Toast from './Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';


function RestaurantDetails({ photos, setPhotos, reviews, setReviews, restaurant, setRestaurant }) {

    const { restaurant_id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch('/api/restaurant/details', {
            method: 'POST',
            body: JSON.stringify(restaurant_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurant(data));
    }, [restaurant_id, setRestaurant]);


    useEffect(() => {
        fetch('/api/show-reviews', {
            method: 'POST',
            body: JSON.stringify(restaurant_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then(data => {
                setReviews(data)
            });
    }, [restaurant_id, setReviews]);

    const handleFavorites = (e) => {
        e.preventDefault()
        fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify(restaurant_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then(data => {
                Toast({ message: data.message, type: data.type })
            });
    };

    function getStarIcons(rating) {
        const icons = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            icons.push(<FontAwesomeIcon key={i} icon={faStar} className="yellow-star" />);
        }
        if (rating % 1 !== 0) {
            icons.push(<FontAwesomeIcon key={rating} icon={faStarHalf} className="yellow-star" />);
        }
        return icons;
    }


    const openModal = (index) => {
        setModalIsOpen(true);
        setCurrentImageIndex(index);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const previousImage = () => {
        setCurrentImageIndex(currentImageIndex - 1);
    };

    const nextImage = () => {
        setCurrentImageIndex(currentImageIndex + 1);
    };


    if (!restaurant || !reviews) {
        return (
            <div> Loading...</div>
        )
    }


    return (
        <>
            <div>
                <h1> Restaurant Details</h1>
                <div>
                    <img src={restaurant.photo_cover} alt='Restaurant cover' width="300" height="300" />
                    <h2>{restaurant.name}</h2>
                    <p> {restaurant.address} {restaurant.city} {restaurant.zipcode}</p>
                    <p> Overall rating : {getStarIcons(restaurant.rating)} </p>
                    <div>
                        <button className='fav-btn' type='button' onClick={handleFavorites}> Add to Your Favorites</button>
                    </div>
                    <div>
                        <h3> Reviews: </h3>
                        {reviews.length > 0 ?
                            reviews.map(({ photos, date, review, review_id, user_id, user_name }) => (
                                <>
                                    <p key={review_id}> User: {user_name} | Date posted: {date} </p><p> {review} </p>
                                    {photos && photos.length > 0 && (
                                        photos.map(({ photo_id, photo_url }, index) => (
                                            <img
                                                key={photo_id}
                                                src={photo_url}
                                                alt={photo_id}
                                                width="100"
                                                height="100"
                                                onClick={() => openModal(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        ))
                                    )}
                                    <Modal isOpen={modalIsOpen}>
                                        {photos && photos.length > 0 && (
                                            <>
                                                <img src={photos[currentImageIndex].photo_url} alt="Expanded" className="modal-image" />
                                                <button onClick={previousImage} disabled={currentImageIndex === 0}>Previous</button>
                                                <button onClick={nextImage} disabled={currentImageIndex === photos.length - 1}>Next</button>
                                            </>
                                        )}
                                        <button onClick={closeModal}>Close</button>
                                    </Modal>

                                </>
                            )) :
                            <p>There are no reviews for this restaurant yet.</p>
                        }

                    </div>


                </div>


            </div >
        </>
    );
};
export default RestaurantDetails;