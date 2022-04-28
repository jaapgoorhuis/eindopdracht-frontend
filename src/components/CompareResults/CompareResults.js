import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {NavLink} from "react-router-dom";
import CalculateWind from "../../Helpers/CalculateWind";

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
                    const devationParam = parseInt(devation);

                    if(type === 'temperatuur') {
                        const inputfield = parseInt(id) + 273.15;
                        if (data.data.main.temp >= inputfield && data.data.main.temp <= inputfield + devationParam) {
                            const roundedNumber = Math.round(data.data.main.temp - 273.15);
                            emptyarray.push({name: placename, data: roundedNumber});
                            emptyarray.sort((a, b) => {
                                return (
                                    a.data - b.data
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
                        const resultParam = data.data.wind.speed * 1.6;
                        const inputParam = parseInt(id);

                        if(CalculateWind(resultParam) >= inputParam && CalculateWind(resultParam) <= inputParam+devationParam) {
                            emptyarray.push({name: placename, data: CalculateWind(resultParam)});

                            emptyarray.sort((a, b) => {
                                return (
                                    a.data - b.data
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
                    else if(type === 'regenval') {

                        let mlPerHour = '';

                        if(data.data.rain) {
                            mlPerHour = data.data.rain['1h'];
                        }
                        else {
                            mlPerHour = 0;
                        }
                        if(mlPerHour <= id) {
                            emptyarray.push({name: placename, data: mlPerHour + ' ml p/u'});
                            emptyarray.sort((a, b) => {
                                return (
                                    a.data - b.data
                                );
                            });
                            const newarray = emptyarray.slice(0, 3);

                            setWeatherData({
                                ...weatherData,
                                data: newarray,
                                status: 'done',
                            });
                        }
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
                    <div className="weather-result-box" key={result.name + counter++}>
                        <div className="weather-result-inner-box" key={result.name + counter++}>
                            <h2 className="placename-title"  > Locatie {counter++} - {result.name}</h2>
                            <h4>Huidige {type}</h4>
                            <small>{result.data}</small>
                            <br/>
                        </div>
                        <NavLink exact activeClassName="active-link" to={`/specific-result/`+result.name}>
                            <button className="submit-button">
                                Weer details
                            </button>
                        </NavLink>
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