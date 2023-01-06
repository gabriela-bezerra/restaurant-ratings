import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ categories }) {

    const [selected, setSelected] = useState(categories[0]);

    const [zipcode, setZipcode] = useState("");

    const [restaurants, setRestaurants] = useState([]);

    const handleSubmitCategory = (e) => {
        e.preventDefault()
        fetch('/api/categories/results', {
            method: 'POST',
            body: JSON.stringify(selected),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurants(data));
    };

    const handleSubmitZipcode = (e) => {
        e.preventDefault()
        fetch('/api/restaurants/zipcode', {
            method: 'POST',
            body: JSON.stringify(zipcode),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurants(data));
    };

    const handleSubmitAll = (e) => {
        e.preventDefault()
        fetch('/api/restaurants')
            .then((response) => response.json())
            .then((restaurantsData) => setRestaurants(restaurantsData));

    }


    return (
        <section className="search-page">
            <div className="search-inputs">
                <div class="one">
                    <h1>Find your next favorite restaurant</h1>
                </div>
                <form className='search-form'>
                    <label className='categories-dropdown'> Search by category</label>
                    <div className='input-wrapper'>
                        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                            {categories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <button type='button' className='myButton' onClick={handleSubmitCategory}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                    </div>
                    <label className='categories-city'> Search by zipcode</label>
                    <div className='input-wrapper'>

                        <input type="text" className='categories-city' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                        <button type='button' className='myButton' onClick={handleSubmitZipcode}><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                    </div>
                    <div>
                        <button type='button' className='myButton all-rest-btn' onClick={handleSubmitAll} > All Restaurants</button>
                    </div>
                </form>
            </div >
            {restaurants.length > 0 && (
                <div className="dataResult">
                    {restaurants.map((restaurant) => (
                        <ul>
                            <li key={restaurant.restaurant_id}>
                                <img className="restaurant-photo" src={restaurant.photo_cover} alt={restaurant.name} />
                                <Link className='results-link' to={`/restaurant-details/${restaurant.restaurant_id}`} >{restaurant.name}</Link>
                            </li>
                        </ul>
                    ))}
                </div>
            )}
        </section >


    )
}
export default SearchBar;
