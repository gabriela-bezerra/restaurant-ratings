import { Link } from 'react-router-dom';

function Navbar(props) {
    const { logo, brand } = props;

    return (
        <nav>
            <Link to="/" className="navbar-brand d-flex justify-content-start">
                <img src={logo} height="60" alt="logo" />
                <span>{brand}</span>
            </Link>

            <section className="d-flex justify-content-end">
                <Link
                    to="/"
                    activeClassName="navlink-active"
                    className="nav-link nav-item"
                >
                    Home
                </Link>

                <Link
                    to="/sign-up"
                    activeClassName="navlink-active"
                    className="nav-link nav-item"
                >
                    Sign up
                </Link>

                <Link
                    to="/login"
                    activeClassName="navlink-active"
                    className="nav-link nav-item"
                >
                    Login
                </Link>

                <Link
                    to="/add-restaurant"
                    activeClassName="navlink-active"
                    className="nav-link nav-item"
                >
                    Add Restaurant
                </Link>
            </section>
        </nav>
    );
}

export default Navbar;