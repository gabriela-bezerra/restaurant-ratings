import { useState } from 'react';
import { useEffect } from 'react';

function UserProfile({ user }) {

    const [userInfo, setUserInfo] = useState(null);


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


    console.log(user)
    console.log(userInfo)

    if (!userInfo) {
        return (
            <div> Loading...</div>
        )
    }

    return (
        <div>
            <h1> Welcome {userInfo.fname} </h1>
            <div>

                <p> User name : {userInfo.fname} {userInfo.lname}</p>
                <p> Email : {userInfo.email} </p>
                <div>
                    {/* <h4> Given Reviews: </h4>
                    <p>Restaurant ID : {userInfo.reviews[0].restaurant_id}, date: {userInfo.reviews[0].date} </p>
                    <p>{userInfo.reviews[0].review}</p> */}


                </div>

            </div>
        </div>
    )

}

export default UserProfile;