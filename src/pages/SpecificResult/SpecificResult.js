import React, {useContext, useState, useEffect} from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useParams} from "react-router-dom";
import FormatDate from "../../Helpers/FormatDate";
import {Link, useHistory} from "react-router-dom";


function SpecificResult() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {ApiKey} = useContext(AuthContext);
    const [weatherData, setWeatherData] = useState({
        status:'pending',
        data: '',
    });


    const {name} = useParams();

    useEffect(()=> {
        async function getCoords() {
            try {
                console.log(name);
                setLoading(true);
                let cancel;

                const result = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&mode=json&appid=${ApiKey}`);

                console.log(result.data);
                setWeatherData({
                    ...weatherData,
                    data: result.data,
                    status: 'done',
                })

                setLoading(false);
                return () => cancel();
            }

            catch(e) {
                console.log(e.response);
            }
        }
        getCoords();
    },[]);


    console.log(weatherData.data);

    return (
        <>
            <div className="container">
                <PageTitle
                    title="4. Details"
                    description="Hierbij een gedetaileerd overzicht van de locatie."
                />
                <div className="page-content">
                    <div className="weather-result-box">

                        {weatherData.data &&
                           <>
                               <div className="weather-result-inner-box">
                                    <h2 >Locatie - {name}</h2>
                                    <h4>Huidige temperatuur</h4>
                                        <small>{Math.round(weatherData.data.main.temp - 273.15)} degrees celcius</small>
                                    <h4>Huidige wind snelheid</h4>
                                        <small>{Math.round(weatherData.data.wind.speed * 1.6)} km</small>
                                    <h4>Zonsondergang</h4>
                                        <small>{FormatDate(weatherData.data.sys.sunset)}</small>
                                    <h4>Zonsondergang</h4>
                                        <small>{FormatDate(weatherData.data.sys.sunset)}</small>
                                    <h4>Type weer</h4>
                                        <small>{weatherData.data.weather[0].description}</small>
                               </div>
                            <Link to={{ pathname: `https://www.google.com/maps/search/?api=1&query=`+ name }} target="_blank">
                                   <button className="submit-button">
                                       Weergeef locatie op de kaart

                                   </button>
                                </Link>
                           </>

                        }

                    </div>
                    <button className="submit-button absolute-button" onClick={history.goBack}>Vorige</button>
                </div>
            </div>
        </>
    )
}

export default SpecificResult;