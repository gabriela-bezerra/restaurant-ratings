import { useState } from 'react';
import { useEffect } from 'react';

function SearchBar(props) {

    const [categories, setCategorires] = useState([]);

    const [selected, setSelected] = useState(categories[0]);

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        fetch('/api/categories')
            .then((response) => response.json())
            .then((data) => setCategorires(data));
    }, []);

    const submit = (e) => {
        e.preventDefault()
        console.log(selected)
        fetch('/api/categories/results', {
            method: 'POST',
            body: JSON.stringify(selected),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => result.json())
            .then((data) => setRestaurants(data));
    };

    const submitAll = (e) => {
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
                            {categories.map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <button type='button' onClick={submit}> Submit </button>
                        {restaurants.map((value) => (
                            <ul>
                                <li>{value}</li>
                            </ul>
                        ))}
                    </div>
                    <div>
                        <label className='categories-city'> Search by city</label>
                        <input type="text" className='categories-city' />
                        <button type='button' onClick={submit}> Submit </button>
                    </div>
                </form>
                <div>
                    All Restaurants
                    <button type='button' onClick={submitAll} > Submit</button>
                    {restaurants.map((value) => (
                        <ul>
                            <li>{value}</li>
                        </ul>
                    ))}
                </div>
            </div>

            <div className="dataResult"></div>
        </section>


    )
}
export default SearchBar;
