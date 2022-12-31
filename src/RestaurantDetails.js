import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import Toast from './Toast';

function RestaurantDetails({ photos, setPhotos, reviews, setReviews, restaurant, setRestaurant }) {

    const { restaurant_id } = useParams();


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
                    <p> Rating : {restaurant.rating} </p>
                    <div>
                        <button className='fav-btn' type='button' onClick={handleFavorites}> Add to Your Favorites</button>
                    </div>
                    <div>
                        <h3> Reviews: </h3>
                        {reviews.map(({ photos, date, review, review_id, user_id, user_name }) => (
                            <>
                                <p key={review_id}> User: {user_name} | Date posted: {date} </p><p> {review} </p>
                                {photos.map(({ photo_id, photo_url }) => (
                                    <img key={photo_id} src={photo_url} alt={photo_id} width="100" height="100" />
                                ))}
                            </>
                        ))}
                    </div>


                </div>


            </div >
        </>
    );
};
export default RestaurantDetails;