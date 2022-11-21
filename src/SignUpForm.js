function SignUpForm(props) {



    return (
        <form className="sign-up-page">
            <div className="cover">
                <h1>Sign up</h1>
                First Name <input type="text" name="first-name" />
                Last Name <input type="text" name="last-name" />
                Email<input type="text" name="email" />
                Password<input type="password" name="password" />

                <input type="submit" className="submit-btn" value="Submit" />

            </div>
        </form >
    )
}
export default SignUpForm;