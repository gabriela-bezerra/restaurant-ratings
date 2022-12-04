import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '/Users/gabrielabezerra/src/react-project/restaurant-ratings/src/logo.png'



function Navbar({ loggedIn, setLoggedIn, user, setUser }) {

    let history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault()
        fetch('/api/logout', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then(data => {
                if (data.status === '200') {
                    setUser("")
                    setLoggedIn(false)
                    history.push('/');
                }
            });
    };


    if (loggedIn === true) {
        return (
            <nav>
                <Link to="/" className="navbar-brand d-flex justify-content-start">
                    <img src={logo} height="60" alt="logo" />
                    <span> Restaurants Finder</span>
                </Link>

                <section className="nav-items d-flex justify-content-end">
                    <Link to="/" className="nav-link nav-item" > Home
                    </Link>

                    <Link to="/add-restaurant" className="nav-link nav-item" >Add Restaurant
                    </Link>

                    <Link to="/user-profile" className="nav-link nav-item" >Profile
                    </Link>

                    <button className='logout' type='button' onClick={handleLogout}> Log Out</button>

                </section>
            </nav>
        );
    } else {
        return (
            <nav>
                <Link to="/" className="navbar-brand d-flex justify-content-start">
                    <img src={logo} height="60" alt="logo" />
                    <span> Restaurants Finder</span>
                </Link>

                <section className="nav-items d-flex justify-content-end">
                    <Link to="/" className="nav-link nav-item" > Home
                    </Link>

                    <Link to="/sign-up" className="nav-link nav-item"> Sign up
                    </Link>

                    <Link to="/login" className="nav-link nav-item"> Login
                    </Link>

                    <Link to="/add-restaurant" className="nav-link nav-item">Add Restaurant
                    </Link>
                </section>
            </nav>
        );
    }
}
export default Navbar;