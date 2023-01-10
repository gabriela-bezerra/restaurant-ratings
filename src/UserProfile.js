import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto'

function UserProfile({ user, userInfo, setUserInfo }) {

    const [favorites, setFavorites] = useState([]);

    const [initials, setInitials] = useState('');

    useEffect(() => {
        if (userInfo) {
            if (!userInfo.profile_photo) {
                const firstInitial = userInfo.fname[0];
                const lastInitial = userInfo.lname[0];
                setInitials(`${firstInitial}${lastInitial}`);
            }
        }
    }, [userInfo])

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
        <div className='container-user-profile'>
            <div className='user-details'>

                <div className='user-info'>
                    <h1> Welcome {userInfo.fname}! </h1>
                    <div className='input-wrapper-user'>
                        <div className='profile-photo'>
                            {userInfo.profile_photo ? (
                                <img className='profile-img'
                                    src={userInfo.profile_photo}
                                    alt="Face"
                                />
                            ) : (
                                <div className="initials-placeholder">{initials}</div>
                            )}
                            <ProfilePhoto userInfo={userInfo} setUserInfo={setUserInfo} />
                        </div>
                        <div className="personal-info" >
                            <h2> Personal Info</h2>
                            <p className='user-name'> User name : {userInfo.fname} {userInfo.lname}</p>
                            <p className='user-email'> Email : {userInfo.email} </p>
                        </div>

                    </div>
                    <div className="fav-lst">
                        <h3> Favorites Restaurants </h3>
                        <div className="favList">
                            {favorites.length > 0 ? (
                                favorites.map((restaurant) => (
                                    <ul>
                                        <li key={restaurant.restaurant_id}>
                                            <img className="restaurant-photo" src={restaurant.photo_cover} alt={restaurant.name} />
                                            <Link className='results-link' to={`/restaurant-details/${restaurant.restaurant_id}`} >{restaurant.name}</Link>
                                        </li>
                                    </ul>
                                ))
                            ) : (
                                <p>No favorites added yet.</p>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default UserProfile;