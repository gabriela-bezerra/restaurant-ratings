function SignUpForm({ handleSubmit, setFirstName, setLastName, setEmail, setPassword }) {



    return (
        <div> Create An Account
            <form className="sign-up-page" onSubmit={handleSubmit}>
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" onChange={setFirstName}></input>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" onChange={setLastName}></input>
                <label htmlFor="email" >Email Address</label>
                <input type="text" id="email" onChange={setEmail}></input>
                <label htmlFor="password"> Password</label>
                <input type="password" id='password' onChange={setPassword}></input>
                <button type="submit">Sign Up </button>
            </form>
        </div>
    )
}
export default SignUpForm;