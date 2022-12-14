import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from './Toast';


function SignUpForm({ setFirstName, setLastName, setEmail, setPassword, setLoggedIn, user }) {

    const [statusMessage, setStatusMessage] = useState("");

    let history = useHistory();

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create-account', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === '200') {
                    setLoggedIn(true)
                    setStatusMessage("")
                    Toast({ message: result.message, type: 'success' })
                    setTimeout(() => {
                        history.push('/user-profile')
                    }, 2000)
                } else {
                    setStatusMessage(result.message)
                }
            }, []);
    };



    return (
        <div className='background'>
            <form className="sign-up-page" onSubmit={handleCreateSubmit}>
                <div className="cover-sign-up">
                    <h1> Create An Account</h1>
                    <label htmlFor="first-name">First Name</label>
                    <input className="input-sign-up" type="text" id="first-name" onChange={setFirstName}></input>
                    <label htmlFor="last-name">Last Name</label>
                    <input className="input-sign-up" type="text" id="last-name" onChange={setLastName}></input>
                    <label htmlFor="email" >Email Address</label>
                    <input className="input-sign-up" type="text" id="email" onChange={setEmail}></input>
                    <label htmlFor="password"> Password</label>
                    <input className="input-sign-up" type="password" id='password' onChange={setPassword}></input>
                    <div style={{ color: 'red' }} className='error-message'>{statusMessage} </div>
                    <button className="login-btn" type="submit">Submit </button>
                </div>
            </form>
        </div>
    )
}
export default SignUpForm;