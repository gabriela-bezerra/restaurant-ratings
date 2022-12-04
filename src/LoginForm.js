import React from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'


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
                    toast("Logged in successfuly!")
                    setErrorMessage("");
                    setLoggedIn(true);
                    history.push('/');
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