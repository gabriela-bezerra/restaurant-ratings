import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

function RestaurantDetails(props) {

    const { restaurant_id } = useParams();

    const [restaurant, setRestaurant] = useState([]);


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

    console.log(restaurant)

    return (
        <div>
            <h1> Restaurant Details</h1>
            <div>
                <img src={restaurant.photo} alt='Restaurant cover' width="300" height="300" />
                <h3>{restaurant.name}</h3>
                <p> {restaurant.address} {restaurant.city} {restaurant.zipcode}</p>
                <p> Rating : {restaurant.rating} </p>
                <div>
                    <h4> Recent Reviews: </h4>
                    <p>User ID : {restaurant.reviews[0].user_id}, date: {restaurant.reviews[0].date} </p>
                    <p>{restaurant.reviews[0].review}</p>


                </div>

            </div>


        </div >
    );
};
export default RestaurantDetails;