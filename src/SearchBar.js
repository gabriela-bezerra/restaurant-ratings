function SearchBar(props) {
    const { data } = props;

    return (
        <section className="search-page">
            <div className="search">
                <div className="search-inputs">
                    <input type="text" placeholder="Enter a category" />
                    <div className="searchIcon"> </div>
                </div>

                <div className="dataResult"></div>
            </div>
        </section>
    )
}
export default SearchBar;
