import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

function RestaurantDetails(props) {

    const { restaurant_id } = useParams();

    const [restaurant, setRestaurant] = useState([]);

    // const handleRestaurantLink = () => {
    //     // e.preventDefault() *** Uncaught TypeError: e.preventDefault is not a function
    useEffect(() => {
        fetch('/api/restaurant/details', {
            method: 'POST',
            body: JSON.stringify(restaurant_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurant(data));
    });
    console.log(restaurant_id)
    console.log(restaurant)

    return (
        <div>
            <h1> Restaurant Details</h1>
            <div>
                <ul key={restaurant.name}>
                    <li> {restaurant.name}</li>
                    <li> {restaurant.address} {restaurant.city} {restaurant.zipcode}</li>

                </ul>

                {/* {Object.values(restaurant).map((row_, index) =>
                    <tr>
                        {Object.values(row_).map(item => <td>{item}</td>)}
                    </tr>
                )} */}
            </div>


        </div>
    );
};
export default RestaurantDetails;