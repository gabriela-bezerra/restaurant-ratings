import { useState } from 'react';
import { useEffect } from 'react';

function SearchBar(props) {

    const [categories, setCategorires] = useState([]);

    const [selected, setSelected] = useState(categories[0]);

    const [zipcode, setZipcode] = useState("")

    const [restaurants, setRestaurants] = useState([])



    useEffect(() => {
        fetch('/api/categories')
            .then((response) => response.json())
            .then((data) => setCategorires(data));
    }, []);

    const submitCategory = (e) => {
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

    const submitZipcode = (e) => {
        e.preventDefault()
        console.log(zipcode)
        fetch('/api/restaurants/results', {
            method: 'POST',
            body: JSON.stringify(zipcode),
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
                        <button type='button' className='btn-category' onClick={submitCategory}> Submit </button>
                    </div>
                    <div>
                        <label className='categories-city'> Search by zipcode</label>
                        <input type="text" className='categories-city' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                        <button type='button' className='btn-city' onClick={submitZipcode}> Submit </button>
                    </div>
                    <div>
                        <label className='all-restaurants'> All Restaurants</label>
                        <button type='button' className='btn-all' onClick={submitAll} > Submit</button>
                    </div>
                </form>
            </div>
            <div className="dataResult">
                {restaurants.map((value) => (
                    <ul>
                        <li>{value}</li>
                    </ul>
                ))}
            </div>

        </section>


    )
}
export default SearchBar;
