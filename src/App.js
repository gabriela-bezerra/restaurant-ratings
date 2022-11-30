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



function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "" });

  // const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

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
      .then((result => {
        setLoggedIn(true)
        history.push('/login')
      }));
  };

  // LOGIN PAGE ----------------------------



  // const handleLoginSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(user)
  //   fetch('/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }).then(result => result.json())
  //     .then(data => {
  //       console.log(data)
  //       if (data.status === '200') {
  //         setErrorMessage("")
  //         history.push('/')
  //       } else {
  //         setErrorMessage(data.message)

  //       }

  //     })
  // }

  // SEARCH PAGE ----------------------------


  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
          <SearchBar />
        </Route>

        <Route exact path="/login">
          <LoginForm user={user} setUser={setUser} />
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

        <Route exact path="/restaurant-details/:restaurant_id">
          <RestaurantDetails />
        </Route>

        <Route exact path="/user-profile/">
          <UserProfile user={user} />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
