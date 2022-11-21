import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
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

  return (
    <BrowserRouter>
      <Navbar logo={logo} brand="Restaurant Finder" />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
          <SearchBar />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/sign-up">
          <SignUpForm />
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
          <UserProfile />
        </Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
