import React, {useState} from 'react';
import "./SearchBar.css";

function SearchBar({setlocationHandler}) {
    const [query, setQuery] = useState('');
    function submitHandler(e) {
        e.preventDefault();
        setlocationHandler(query);
    }

    return (
        <>
            <form className="search-form" onSubmit={submitHandler}>
                <input
                    type="text"
                    className="search-field"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Zoek een plaats in Gelderland"
                />
                <button type="submit" className="search-button">Zoeken</button>
            </form>
        </>
    )
}

export default SearchBar;