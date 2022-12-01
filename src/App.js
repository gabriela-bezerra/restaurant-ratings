import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import AddNewRestaurant from './AddNewRestaurant'
import SearchResult from './SearchResult'
import RestaurantDetails from './RestaurantDetails'
import UserProfile from './UserProfile'



function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const [statusMessage, setStatusMessage] = useState("");

  // const history = useHistory();

  // SIGN UP PAGE -------------------------

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
        setLoggedIn(true)
        setStatusMessage(result.message)
      }, []);
  };
  console.log('app page---------')
  console.log(user)
  console.log(loggedIn)

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} user={user} />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
          <SearchBar />
        </Route>

        <Route exact path="/login">
          <LoginForm user={user} setUser={setUser} setLoggedIn={setLoggedIn} />
        </Route>

        <Route exact path="/sign-up">
          <SignUpForm handleSubmit={handleCreateSubmit}
            setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
            setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
            setEmail={(e) => setUser({ ...user, email: e.target.value })}
            setPassword={(e) => setUser({ ...user, password: e.target.value })}
            statusMessage={statusMessage} />
        </Route>

        <Route exact path="/add-restaurant">
          <AddNewRestaurant />
        </Route>

        <Route exact path="/search-results">
          <SearchResult />
        </Route>

        <Route exact path="/restaurant-details/:restaurant_id">
          <RestaurantDetails />
        </Route>

        <Route exact path="/user-profile/:user_id">
          <UserProfile user={user} />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
