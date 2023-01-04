import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Toast from './Toast';
import logo from '/Users/gabrielabezerra/src/react-project/restaurant-ratings/src/logo.png'



function Navbar({ loggedIn, setLoggedIn, user, setUser }) {

    let history = useHistory();

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => { setMenuVisible(!menuVisible) };

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
                    Toast({ message: data.message, type: 'success' })
                    setTimeout(() => {
                        history.push('/')
                    }, 2000)
                }
            });
    };


    if (loggedIn === true) {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar-brand d-flex justify-content-start">
                    <img src={logo} className="logo" alt="logo" />
                    <span className="navbar-title"> Restaurant Finder</span>
                </Link>

                <section className="nav-items">
                    <Link to="/" className="nav-link" > Home
                    </Link>

                    <Link to="/add-restaurant" className="nav-link" >Add Restaurant
                    </Link>

                    <Link to="/user-profile" className="nav-link" >Profile
                    </Link>

                    <button className='logout' type='button' onClick={handleLogout}> Log Out</button>
                </section>
            </nav>
        );
    } else {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar-brand d-flex justify-content-start">
                    <img src={logo} className="logo" alt="logo" />
                    <span className="navbar-title"> Restaurant Finder</span>
                </Link>
                <a href='#' className='toggle-button' onClick={toggleMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </a>

                <section className="nav-items">
                    <Link to="/" className="nav-link" > Home
                    </Link>

                    <Link to="/sign-up" className="nav-link"> Sign up
                    </Link>

                    <Link to="/login" className="nav-link"> Login
                    </Link>
                </section>
            </nav>
        );
    }
}
export default Navbar;