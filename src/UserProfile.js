import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile({ user }) {

    const [userInfo, setUserInfo] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch('/api/user/details', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setUserInfo(data));
    }, [user]);


    useEffect(() => {
        fetch('/api/user/favorites', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setFavorites(data));
    }, [user]);


    if (!userInfo) {
        return (
            <div> Loading...</div>
        )
    }

    return (
        <div>
            <h1> Welcome {userInfo.fname} </h1>
            <div>
                <img style={{ width: "30%", margin: "30px 0" }} src={userInfo.profile_photo} alt="Face" />
                <p> User name : {userInfo.fname} {userInfo.lname}</p>
                <p> Email : {userInfo.email} </p>
                <div>
                    {/* <h4> Given Reviews: </h4>
                    <p>Restaurant ID : {userInfo.reviews[0].restaurant_id}, date: {userInfo.reviews[0].date} </p>
                    <p>{userInfo.reviews[0].review}</p> */}
                </div>
                <div className="fav-lst">
                    <h3> Favorites Restaurants </h3>
                    {favorites.map((restaurant) => (
                        <ul>
                            <li key={restaurant.restaurant_id}><Link to={`/restaurant-details/${restaurant.restaurant_id}`} >{restaurant.name}</Link></li>
                        </ul>
                    ))}
                </div>

            </div>
        </div>
    )

}

export default UserProfile;