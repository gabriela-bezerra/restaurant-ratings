import { useState } from "react";
import { useHistory } from 'react-router-dom';
import RestaurantCover from './RestaurantCover'
import Toast from './Toast';

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
        <form className="add-restaurant-page">
            <div className="cover-add">
                <h3>Add A New Restaurant</h3>
                Name <input type="text" name="name" onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} value={newRestaurant.name} />
                Address <input type="text" name="address" onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })} value={newRestaurant.address} />
                City <input type="text" name="city" onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })} value={newRestaurant.city} />
                State <input type="text" name="state" onChange={(e) => setNewRestaurant({ ...newRestaurant, state: e.target.value })} value={newRestaurant.state} />
                Zipcode <input type="text" name="zipcode" onChange={(e) => setNewRestaurant({ ...newRestaurant, zipcode: e.target.value })} value={newRestaurant.zipcode} />
                Upload a photo
                <RestaurantCover setCoverPhoto={setCoverPhoto} />
                {/* <input type="text" name="photo" onChange={(e) => setNewRestaurant({ ...newRestaurant, photo_url: e.target.value })} value={newRestaurant.photo_url} /> */}
                <label className='categories-dropdown'> Category</label>
                <select onChange={(e) => setNewRestaurant({ ...newRestaurant, category: e.target.value })} value={newRestaurant.category}>
                    {categories.map((category) => (
                        <option value={category} key={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input type="submit" className="submit-btn" value="Submit" onClick={handleSubmit} />
                {statusMessage}
            </div>
        </form >
    )
}
export default AddNewRestaurant;