import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile({ user, userInfo, setUserInfo }) {

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
    }, [user, setUserInfo]);


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