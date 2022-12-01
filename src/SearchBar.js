import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchBar(props) {

    const [categories, setCategorires] = useState([]);

    const [selected, setSelected] = useState(categories[0]);

    const [zipcode, setZipcode] = useState("");

    const [restaurants, setRestaurants] = useState([]);


    useEffect(() => {
        fetch('/api/categories')
            .then((response) => response.json())
            .then((data) => setCategorires(data));
    }, []);

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
        console.log(zipcode)
        console.log(restaurants)
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
                <form className='search-page'>
                    <div>
                        <label className='categories-dropdown'> Search by category</label>
                        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                            {categories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <button type='button' className='btn-category' onClick={handleSubmitCategory}> Submit </button>
                    </div>
                    <div>
                        <label className='categories-city'> Search by zipcode</label>
                        <input type="text" className='categories-city' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                        <button type='button' className='btn-city' onClick={handleSubmitZipcode}> Submit </button>
                    </div>
                    <div>
                        <label className='all-restaurants'> All Restaurants</label>
                        <button type='button' className='btn-all' onClick={handleSubmitAll} > Submit</button>
                    </div>
                </form>
            </div >
            <div className="dataResult">
                {restaurants.map((restaurant) => (
                    <ul>
                        <li key={restaurant.restaurant_id}><Link to={`/restaurant-details/${restaurant.restaurant_id}`} >{restaurant.name}</Link></li>
                    </ul>
                ))}
            </div>

        </section >


    )
}
export default SearchBar;
