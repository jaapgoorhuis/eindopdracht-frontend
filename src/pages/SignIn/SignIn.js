import React, {useContext, useEffect, useState} from "react";
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAt, faLock, faRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext";
import {Link, useHistory, useLocation} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";

function SignIn() {
    const History = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {logIn, isauth} = useContext(AuthContext);
    const [serverError, toggleServerError] = useState(false);

    async function signUserIn(data) {
        toggleServerError(false);
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username:data.username,
                password: data.password,
            });
            logIn(response.data);
        }
        catch(e) {
            console.error(e);
            console.log(e.response);
            toggleServerError(true);
        }
    }

    return (
        <>
            {isauth ?
                History.push('/places')
                :
            <div className="wrapper">
                <div className="login-form-wrapper">
                    <h2 className="login-title">Inloggen</h2>
                    <small className="login-sub-title">WeatherApp</small>
                    <form className="login-form" onSubmit={handleSubmit(signUserIn)}>
                        <div className="input-field">
                            <label htmlFor="username">Gebruikersnaam <br/></label>
                            <i><FontAwesomeIcon icon={faAt}/></i>
                            <input
                                name="username"
                                id="username"
                                type="text"
                                placeholder="username"
                                {...register("username", {required:true})}
                            />
                            {errors.username && <p className="small-error-message">Dit veld is verplicht</p> }
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Wachtwoord <br/></label>
                            <i><FontAwesomeIcon icon={faLock}/></i>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Wachtwoord"
                                {...register("password", {required:true})}
                            />
                            {errors.password && <p className="small-error-message">Dit veld is verplicht</p> }
                            {serverError && <p className="small-error-message">De gegevens komen niet overeen</p> }
                        </div>
                        <button
                            type="submit"
                            className="login-button submit-button"
                        >
                            <i><FontAwesomeIcon icon={faRightToBracket}/></i>
                            Inloggen
                        </button>
                        <Link to="/signup">
                            <button
                                type="button"
                                className="submit-button register-button"
                            >
                                <i><FontAwesomeIcon icon={faUserPlus}/></i>
                                Registreren
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            }
        </>
    )
}
export default SignIn;