import { Link } from 'react-router-dom';


function Navbar(logo) {

    // if (loggedIn) {
    //     return (
    //         <nav>
    //             <Link to="/" className="navbar-brand d-flex justify-content-start">
    //                 <img src={logo} height="60" alt="logo" />
    //             </Link>

    //             <section className="d-flex justify-content-end">
    //                 <Link to="/" className="nav-link nav-item" > Home
    //                 </Link>

    //                 <Link to="/add-restaurant" className="nav-link nav-item" >Add Restaurant
    //                 </Link>
    //             </section>
    //         </nav>
    //     );
    // } else {
    return (
        <nav>
            <Link to="/" className="navbar-brand d-flex justify-content-start">
                <img src={logo} height="60" alt="logo" />
            </Link>

            <section className="d-flex justify-content-end">
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
export default Navbar;