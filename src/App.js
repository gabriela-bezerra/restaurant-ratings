import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import logo from '/Users/gabrielabezerra/src/react-project/restaurant-ratings/src/logo.png'




function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({ email: "", password: "" });

  let history = useHistory();

  // const [restaurantId, setRestaurantId] = useState(0)
  // const [restaurants, setRestaurants] = useState([]);


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
        history.push('/login')
      });
  };

  // useEffect(() => {
  //   fetch('/api/restaurants')
  //     .then((response) => response.json())
  //     .then((responseJson) => setRestaurants(responseJson.restaurants))
  // }, []);



  return (
    <BrowserRouter>
      <Navbar logo={logo} brand="Restaurant Finder" loggedIn={loggedIn} />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
          <SearchBar />
        </Route>

        <Route exact path="/login">
          <LoginForm />
        </Route>

        <Route exact path="/sign-up">
          <SignUpForm handleSubmit={handleCreateSubmit}
            setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
            setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
            setEmail={(e) => setUser({ ...user, email: e.target.value })}
            setPassword={(e) => setUser({ ...user, password: e.target.value })} />
        </Route>

        <Route exact path="/add-restaurant">
          <AddNewRestaurant />
        </Route>

        <Route exact path="/search-results">
          <SearchResult />
        </Route>

        <Route exact path="/restaurant-details">
          <RestaurantDetails />
        </Route>

        <Route exact path="/user-profile">
          <UserProfile user={user} />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
