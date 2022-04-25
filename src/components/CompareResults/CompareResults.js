import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";

function CompareResults() {


    const {ApiKey} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const {type, id, devation} = useParams();
    const selectedPlaces = JSON.parse(localStorage.getItem('placenames'));
    const [weatherData, setWeatherData] = useState({
        status:'pending',
        data:[],
    });

    const emptyarray = [];

    useEffect(() => {

        selectedPlaces.map((placename)=> {
            async function fetchCoords() {
                try {
                    setLoading(true);
                    let cancel;
                    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${placename}&mode=json&appid=${ApiKey}`, {cancelToken: new axios.CancelToken(c => cancel = c)});
                    setLoading(false);

                    if(type === 'temperatuur') {
                        const inputfield = parseInt(id) + 273.15;
                        console.log(data.data.main.temp);

                        const devationParam = parseInt(devation);

                        console.log(inputfield);

                        if (data.data.main.temp >= inputfield && data.data.main.temp <= inputfield + devationParam) {
                            emptyarray.push({name: placename, temp: data.data.main.temp});

                            emptyarray.sort((a, b) => {
                                return (
                                    a.temp - b.temp
                                );
                            })
                            const newarray = emptyarray.slice(0, 3);


                            setWeatherData({
                                ...weatherData,
                                data: newarray,
                                status: 'done',
                            });
                        }
                    }

                    else if(type === 'windkracht') {

                    }

                    else {
                        console.log('oeps er is iets fout gegaan');
                    }

                    return () => cancel();
                } catch (e) {
                    console.log(e.response);
                }
            }

            fetchCoords();
        });
    }, []);

    let counter = 1;

    return (
        <>
            {weatherData.data.length >0 ? weatherData.data.map((result) => {
                return(
                    <>
                    <div className="weather-result-box" key={result.name}>
                        <div className="weather-result-inner-box">
                            <h2 className="placename-title"  > Locatie {counter++} - {result.name}</h2>
                            <h4>Huidige {type}</h4>
                            <small>{Math.round(result.temp - 273.15)} graden celcius</small>
                            <br/>
                        </div>
                        <button className="specific-result-button">
                            <NavLink exact activeClassName="active-link" to={`/specific-result/`+result.name}>Weer details</NavLink>
                        </button>
                    </div>
                    </>
                )
            })
                : <h2>Oeps! Er zijn geen resultaten gevonden</h2>
            }

        </>
    )
};


export default CompareResults;
