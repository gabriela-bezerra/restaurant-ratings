import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpForm({ setFirstName, setLastName, setEmail, setPassword, setLoggedIn, user }) {

    const [statusMessage, setStatusMessage] = useState("");

    let history = useHistory();

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === '200') {
                    localStorage.setItem('token-info', JSON.stringify(user));
                    setLoggedIn(true)
                    setStatusMessage(result.message)
                    history.push('/')
                } else {
                    setStatusMessage(result.message)
                }
            }, []);
    };


    return (
        <div>
            <h1> Create An Account</h1>
            <form className="sign-up-page" onSubmit={handleCreateSubmit}>
                <div className="cover-sign-up">
                    <label htmlFor="first-name">First Name</label>
                    <input className="input-sign-up" type="text" id="first-name" onChange={setFirstName}></input>
                    <label htmlFor="last-name">Last Name</label>
                    <input className="input-sign-up" type="text" id="last-name" onChange={setLastName}></input>
                    <label htmlFor="email" >Email Address</label>
                    <input className="input-sign-up" type="text" id="email" onChange={setEmail}></input>
                    <label htmlFor="password"> Password</label>
                    <input className="input-sign-up" type="password" id='password' onChange={setPassword}></input>
                    {statusMessage}
                    <button className="login-btn" type="submit">Create Account </button>
                </div>
            </form>
        </div>
    )
}
export default SignUpForm;