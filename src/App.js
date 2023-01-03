import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './Homepage';
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import AddNewRestaurant from './AddNewRestaurant'
import RestaurantDetails from './RestaurantDetails'
import UserProfile from './UserProfile'
import ReviewModal from './ReviewModal'
import ProfilePhoto from './ProfilePhoto'
import Toast from './Toast';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const [currentUser, setCurrentUser] = useState({ user_id: "" })

  const [reviews, setReviews] = useState(null);

  const [restaurantPhotos, setRestaurantPhotos] = useState(null);

  const [categories, setCategorires] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  const [restaurant, setRestaurant] = useState(null);

  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    fetch('/api/login-status')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '200') {
          setLoggedIn(true)
          setCurrentUser(data.user_id)
        }
      })
  })

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategorires(data));
  }, []);


  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
      <Route exact path="/">
        <Homepage />
        <SearchBar categories={categories} />
        <Toast />
      </Route>

      <Route exact path="/login">
        <LoginForm user={user} setUser={setUser} setLoggedIn={setLoggedIn} />
        <Toast />
      </Route>

      <Route exact path="/sign-up">
        <SignUpForm
          setFirstName={(e) => setUser({ ...user, firstName: e.target.value })}
          setLastName={(e) => setUser({ ...user, lastName: e.target.value })}
          setEmail={(e) => setUser({ ...user, email: e.target.value })}
          setPassword={(e) => setUser({ ...user, password: e.target.value })}
          setLoggedIn={setLoggedIn}
          user={user}
        />
        <Toast />
      </Route>

      <Route exact path="/add-restaurant">
        <AddNewRestaurant categories={categories} coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />
        <Toast />
      </Route>

      <Route exact path="/restaurant-details/:restaurant_id">
        <RestaurantDetails reviews={reviews} setReviews={setReviews} restaurant={restaurant} setRestaurant={setRestaurant} photos={restaurantPhotos} setPhotos={setRestaurantPhotos} />
        <ReviewModal restaurant={restaurant} setRestaurant={setRestaurant} reviews={reviews} setReviews={setReviews} photos={restaurantPhotos} setPhotos={setRestaurantPhotos} />
        <Toast />
      </Route>

      <Route exact path="/user-profile">
        <UserProfile user={currentUser} userInfo={userInfo} setUserInfo={setUserInfo} />
        <ProfilePhoto userInfo={userInfo} setUserInfo={setUserInfo} />
        <Toast />
      </Route>
    </>
  );
}

export default App;
