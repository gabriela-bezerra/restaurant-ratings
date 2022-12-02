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


    return (
        <div>
            <h1> Restaurant Details</h1>
            <div>
                <img src={restaurant.photo} alt='Restaurant cover' width="300" height="300" />
                <h3>{restaurant.name}</h3>
                <p> {restaurant.address} {restaurant.city} {restaurant.zipcode}</p>
                <p> Rating : {restaurant.rating} </p>
                <div>
                    Reviews:
                    {restaurant.reviews}, {restaurant.reviews}
                    {restaurant.reviews}


                </div>

            </div>


        </div >
    );
};
export default RestaurantDetails;