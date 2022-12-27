import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginForm({ user, setUser, setLoggedIn }) {


    const [errorMessage, setErrorMessage] = useState("");

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then(data => {
                if (data.status === '200') {
                    setErrorMessage("");
                    setLoggedIn(true);
                    toast.success(data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        history.push('/')
                    }, 3000)
                } else {
                    setErrorMessage(data.message)

                }

            }, []);
    };


    return (

        <form className="login-page" onSubmit={handleSubmit}>
            <div className="cover">
                <h1>Login</h1>
                <input type="text" placeholder="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                <input type="password" placeholder="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} />
                {errorMessage}
                <input type="submit" className="login-btn" value="Login" />

                <p className="text">Or login using</p>

                <div className="alt-login">
                    <div className="facebook"></div>
                    <div className="google"></div>
                </div>
            </div>
        </form >
    )
}

export default LoginForm;