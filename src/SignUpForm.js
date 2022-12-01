function SignUpForm({ handleSubmit, setFirstName, setLastName, setEmail, setPassword, statusMessage }) {



    return (
        <div>
            <h1> Create An Account</h1>
            <form className="sign-up-page" onSubmit={handleSubmit}>
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