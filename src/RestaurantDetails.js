import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

function RestaurantDetails({ reviews, setReviews }) {

    const { restaurant_id } = useParams();

    const [restaurant, setRestaurant] = useState(null);


    useEffect(() => {
        fetch('/api/restaurant/details', {
            method: 'POST',
            body: JSON.stringify(restaurant_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurant(data));
    }, [restaurant_id]);


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
                console.log(data.message)
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
                console.log(data)
            });
    }, [restaurant_id]);


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
                    <img src={restaurant.photo} alt='Restaurant cover' width="300" height="300" />
                    <h3>{restaurant.name}</h3>
                    <p> {restaurant.address} {restaurant.city} {restaurant.zipcode}</p>
                    <p> Rating : {restaurant.rating} </p>
                    <div>
                        <button className='fav-btn' type='button' onClick={handleFavorites}> Add to Your Favorites</button>
                    </div>
                    <div>
                        <h4> Recent Reviews: </h4>
                        {reviews.map(({ date, review, review_id, user_id }) => (
                            <><p key={review_id}>User ID: {user_id} Date posted: {date} </p><p> {review} </p></>))}
                    </div>


                </div>


            </div >
        </>
    );
};
export default RestaurantDetails;