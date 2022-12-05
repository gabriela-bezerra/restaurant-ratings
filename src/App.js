import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  const [currentUser, setCurrentUser] = useState({ user_id: "" })

  useEffect(() => {
    fetch('/api/login-status')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '200') {
          setLoggedIn(true)
          setCurrentUser(data.user_id)
        }
        console.log(data.message)
      })
  })

  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
          <SearchBar />
        </Route>

        <Route exact path="/login">
          <LoginForm user={user} setUser={setUser} setLoggedIn={setLoggedIn} />
        </Route>

        <Route exact path="/sign-up">
          <SignUpForm
            setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
            setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
            setEmail={(e) => setUser({ ...user, email: e.target.value })}
            setPassword={(e) => setUser({ ...user, password: e.target.value })}
            setLoggedIn={setLoggedIn}
            user={user} />
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

        <Route exact path="/user-profile">
          <UserProfile user={currentUser} />
        </Route>
      </div>
    </>
  );
}

export default App;
