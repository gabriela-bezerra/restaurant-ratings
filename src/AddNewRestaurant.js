function AddNewRestaurant(props) {

    return (
        <form className="add-restaurant-page">
            <div className="cover-add">
                <h3>Add A New Restaurant</h3>
                Name <input type="text" name="name" />
                Address <input type="text" name="address" />
                City <input type="text" name="city" />
                State <input type="text" name="state" />
                Zipcode <input type="text" name="zipcode" />
                Latitude<input type="text" name="latitude" />
                Longitude <input type="text" name="longitude" />


                <input type="submit" className="submit-btn" value="Submit" />

            </div>
        </form >
    )
}
export default AddNewRestaurant;