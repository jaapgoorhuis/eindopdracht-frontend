import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import "../../App.css";
import "./Places.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import NavBar from "../../components/NavBar/NavBar";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Places() {
    const {ApiKey} = useContext(AuthContext);
    const [placeNames, setPlaceNames] = useState([]);
    const[location, setLocation] = useState('');
    const [error, toggleError] = useState(false);
    const[placeLimit, togglePlaceLimit] = useState(false);
    const[placeDuplicate, togglePlaceDuplicate] = useState(false);
    const[wrongProvince, toggleWrongProvince] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPlaces() {
            //first set all errors to false
            toggleError(false);
            togglePlaceLimit(false);
            togglePlaceDuplicate(false);
            toggleWrongProvince(false);

            try {
                let cancel;
                setLoading(true);
                const result = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location},NL&appid=${ApiKey}`,{cancelToken: new axios.CancelToken (c=> cancel = c)});
                setLoading(false);

                //first check if place not already exists in placename state
                if(placeNames.toString().toLowerCase().includes(location.toLowerCase().toString())) {
                    togglePlaceDuplicate(true);
                }
                else {
                    //then check if place exist in province
                    if(result.data[0].state !== 'Gelderland') {
                        toggleWrongProvince(true);
                    }

                    //then check if limit of places is reached
                    else if (placeNames.length < 10) {
                        setPlaceNames([...placeNames, `${result.data[0].name}`]);
                    }
                    else {
                        togglePlaceLimit(true);
                    }
                }
                return () => cancel();

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }
        if(location) {
            fetchPlaces();

        }
    }, [location]);

    useEffect(() => {
        const retrivePlaces = JSON.parse(localStorage.getItem('placenames'));
        if (retrivePlaces) setPlaceNames(retrivePlaces);
    }, []);

    useEffect(() => {
        if(placeNames?.length) {
            localStorage.setItem('placenames', JSON.stringify(placeNames));
        }
    }, [placeNames]);

    if(loading) return "Loading...";

    function removeItems() {
        localStorage.removeItem('placenames');
        setPlaceNames([]);
    }
    return (
        <>
            <NavBar/>
            <div className="container">
                <PageTitle
                    title="1. Plaatsen selecteren"
                    description="Kies maximaal 10 locaties in Gelderland die je mee wilt nemen in de scoring."
                />
                <div className="page-content">

                    <div className="searcbox">
                        <SearchBar setlocationHandler={setLocation}/>
                        <div className='error-message'>
                            {error &&
                            <span>Deze locatie bestaat niet.</span>
                            }
                            {placeLimit &&
                            <span>
                            Het limiet is bereikt!
                        </span>
                            }
                            {placeDuplicate &&
                            <span>
                            Je hebt deze plaats al toegevoegd.
                        </span>
                            }
                            {wrongProvince &&
                            <span>
                            Deze plaats ligt niet in Gelderland!
                        </span>
                            }
                        </div>
                    </div>
                    <div className="placenames-box">
                        {placeNames.length > 0 &&
                            <h2 className="placename-title">Toegevoegde plaatsen:</h2>
                        }
                        <ol>
                            {placeNames.map((p) => {
                                return (
                                    <li className="placenames" key={p}>
                                        {p}
                                    </li>
                                )
                            })}
                        </ol>
                        {placeNames.length > 0 &&
                            <button className="search-button" onClick={removeItems}>Reset</button>
                        }
                    </div>
                    {placeNames.length > 0 &&
                    <div className="footer-box">
                        <Link to={`/weatherconditions`}>
                            <button className="submit-button" type="submit">
                                Volgende
                            </button>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Places;