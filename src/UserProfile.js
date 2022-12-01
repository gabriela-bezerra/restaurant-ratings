import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

function UserProfile({ user }) {

    const { user_id } = useParams();

    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        fetch('/api/restaurant/details', {
            method: 'POST',
            body: JSON.stringify(user_id),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setUserInfo(data));
    }, [user_id]);
    return (
        <h1> Welcome {userInfo.name} </h1>




    )
}
export default UserProfile;