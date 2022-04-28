import React, {useState} from "react";
import NavBar from "../../components/NavBar/NavBar";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./WeatherConditions.css";
import {Link, NavLink, useHistory} from "react-router-dom";


function WeatherConditions() {
    const history = useHistory();
    const [paramaters, toggleParamaters] = useState(false);
    const [selectedConditionValue, toggleSelectedConditionValue] = useState('');
    const [filledParameter, setFilledParameter] = useState('');
    const [devation, setDevation] = useState('');

    function onChange(data) {
        toggleParamaters(true);
        toggleSelectedConditionValue(data.target.value);
        if(data.target.value === 'regenval') {
            setDevation(1);
        }
    }

    function fillParameter(data) {
        setFilledParameter(data.target.value);
    }

    function fillSecondParameter(data) {
        setDevation(data.target.value);
    }
    return (
        <>
            <NavBar/>
            <div className="container">
                <PageTitle
                    title="2. Filters instellen"
                    description="Vink de conditie aan waarop je de gekozen locaties wilt filteren. Vervolgens kun je paramaters instellen. De parameter velden accepteren alleen nummers."
                />
                <div className="page-content">
                    <div className="condition-filter-box">
                        <label htmlFor="condition">
                            <h3>1. Selecteer een conditie</h3>
                            <select
                                className="condition"
                                defaultValue={'DEFAULT'}
                                name="condition"
                                onChange={onChange}
                            >
                            <option disabled={true} value="DEFAULT">Maak een keuze</option>
                            <option value="windkracht">Windkracht</option>
                            <option value="temperatuur">Temperatuur</option>
                            <option value="regenval">Regenval</option>
                            </select>
                        </label>
                    </div>
                    {paramaters &&
                        <>
                        <div className="parameters-box">
                            <h3>2. Parameters instellen</h3>
                            <div className="parameter">
                                <label htmlFor="min_value">
                                    {selectedConditionValue === 'regenval' ?
                                        <span>Vul de maximale gewenste {selectedConditionValue} p/u in ml in</span>

                                        : <span>Vul de minimale gewenste {selectedConditionValue} in</span>
                                    }
                                    <br/>
                                        <input
                                        type="number"
                                        id="min_value"
                                        name="min_value"
                                        className="form-input"
                                        onChange={fillParameter}
                                    />
                                </label>
                            </div>
                        </div>
                            {selectedConditionValue !== 'regenval' &&
                                <div className="parameters-box">
                                    <h3>3. Afwijking instellen</h3>
                                    <div className="parameter">
                                        <label htmlFor="devation">
                                            Hoeveel mag de {selectedConditionValue} afwijken? <br/>
                                            <input
                                                type="number"
                                                id="devation"
                                                name="devation"
                                                className="form-input"
                                                onChange={fillSecondParameter}
                                            />
                                        </label>
                                    </div>
                                </div>
                            }
                        </>

                    }
                    <div className="footer-box">
                        {devation &&
                            <NavLink exact activeClassName="active-link"
                                     to={"/results/" + filledParameter + "/" + selectedConditionValue + "/" + devation}>
                                <button
                                    className="submit-button"
                                    type="submit"
                                >
                                    Vergelijken
                                </button>
                            </NavLink>
                        }
                        <Link to={`/places`}>
                            <button className="submit-button" type="submit">
                                vorige
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WeatherConditions;