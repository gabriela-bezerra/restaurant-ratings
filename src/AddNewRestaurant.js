import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Toast from './Toast';
import RestaurantCover from './RestaurantCover'


function AddNewRestaurant({ coverPhoto, setCoverPhoto, categories }) {

    const [newRestaurant, setNewRestaurant] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/create-restaurant', {
            method: 'POST',
            body: JSON.stringify({ ...newRestaurant, photo_url: coverPhoto }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === '200') {
                    setStatusMessage("")
                    Toast({ message: result.message, type: 'success' })
                    setTimeout(() => {
                        history.push('/')
                    }, 2500)
                } else {
                    setStatusMessage(result.message)
                }
            }, []);
    };


    return (
        <div className='background'>
            <form className="add-restaurant-page">
                <div className="cover-add">
                    <h1>Add A New Restaurant</h1>
                    <label className="first-name">Name</label>
                    <input type="text" name="name" onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} value={newRestaurant.name} />
                    <label className="address">Address</label>
                    <input type="text" name="address" onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })} value={newRestaurant.address} />
                    <label className="city">City</label>
                    <input type="text" name="city" onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })} value={newRestaurant.city} />
                    <label className="state">State</label>
                    <input type="text" name="state" onChange={(e) => setNewRestaurant({ ...newRestaurant, state: e.target.value })} value={newRestaurant.state} />
                    <label className="zipcode">Zipcode</label>
                    <input type="text" name="zipcode" onChange={(e) => setNewRestaurant({ ...newRestaurant, zipcode: e.target.value })} value={newRestaurant.zipcode} />
                    <div className="add-rest-photo">Upload a photo<RestaurantCover setCoverPhoto={setCoverPhoto} /></div>
                    <div className="inline-block-group">
                        <label className='categories-dropdown-add'> Category</label>
                        <select onChange={(e) => setNewRestaurant({ ...newRestaurant, category: e.target.value })} value={newRestaurant.category}>
                            {categories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="login-btn-new-rest" onClick={handleSubmit}>Submit </button>
                    <div style={{ color: 'red' }} className='error-message'>{statusMessage} </div>
                </div>
            </form >
        </div>
    )
}
export default AddNewRestaurant;