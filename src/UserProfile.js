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
                <h1> Welcome {userInfo.fname}! </h1>
                <div className='user-info'>
                    {userInfo.profile_photo ? (
                        <img
                            style={{ width: "30%", margin: "30px 0" }}
                            src={userInfo.profile_photo}
                            alt="Face"
                        />
                    ) : (
                        <div className="initials-placeholder">{initials}</div>
                    )}
                    <ProfilePhoto userInfo={userInfo} setUserInfo={setUserInfo} />
                    <p className='user-name'> User name : {userInfo.fname} {userInfo.lname}</p>
                    <p className='user-email'> Email : {userInfo.email} </p>
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
        </div>
    )

}

export default UserProfile;