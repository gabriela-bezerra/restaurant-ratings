import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from './Toast';


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
                    Toast({ message: data.message, type: 'success' })
                    setTimeout(() => {
                        history.push('/')
                    }, 2500)
                } else {
                    setErrorMessage(data.message)

                }

            }, []);
    };


    return (
        <div className='background'>
            <form className="login-page" onSubmit={handleSubmit}>
                <div className="cover">
                    <h1>Login</h1>
                    <input type="text" placeholder="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                    <input type="password" placeholder="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} />
                    <div style={{ color: 'red' }} className='error-message'>{errorMessage} </div>
                    <button className="login-btn"> Submit </button>
                    <p className="text">Or Login Using</p>
                    <div className="alt-login">
                        <div className="facebook"></div>
                        <div className="google"></div>
                    </div>
                </div>
            </form >
        </div>
    )
}

export default LoginForm;