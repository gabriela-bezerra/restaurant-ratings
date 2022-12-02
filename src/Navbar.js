import { Link } from 'react-router-dom';
import logo from '/Users/gabrielabezerra/src/react-project/restaurant-ratings/src/logo.png'



function Navbar({ loggedIn, user }) {


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