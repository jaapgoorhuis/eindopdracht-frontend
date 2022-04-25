import React, {useState, useRef} from "react";
import '../SignIn/SignIn.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

function SignUp() {
    const [inputs, setInputs] = useState({
        status:'pending',
    });

    const [serverError, toggleServerError] = useState(false);
    const History = useHistory();
    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    console.log('ERRORS', errors);

    async function onSubmit(data) {
        try {
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"],
            });
            setInputs({
                ...inputs,
                status: 'done',
            });
            console.log(result);
            if (inputs.status === 'done') {
                History.push('/signin', {message: 'Account aangemaakt. U kunt nu inloggen'});
            }

        } catch (e) {
            console.error(e);
            console.log(e.response);
            setInputs({
                ...inputs,
                status: 'done',
            });
           toggleServerError(true);
        }
    }

    return (
        <>
            <div className="wrapper">
                <div className="login-form-wrapper">
                    <h2 className="login-title">Registreren</h2>
                    <small className="login-sub-title">WeatherApp</small>
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-field">
                            <label htmlFor="email">Email adres <br/></label>
                            <i><FontAwesomeIcon icon={faAt} /></i>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email adres"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Dit email adres is niet geldig"
                                    }
                                })}
                            />
                            {errors.email && <p className="small-error-message">{errors.email.message}</p> }
                        </div>

                        <div className="input-field">
                            <label htmlFor="username">Gebruikersnaam <br/></label>
                            <i><FontAwesomeIcon icon={faUserPlus} /></i>
                            <input
                                id="username"
                                type="text"
                                placeholder="Gebruikersnaam"
                                {...register("username", {
                                    required: true,
                                })}
                            />
                            {errors.username && <p className="small-error-message">Dit veld is verplicht</p> }
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Wachtwoord <br/></label>
                            <i><FontAwesomeIcon icon={faLock} /></i>
                            <input
                                id="password"
                                type="password"
                                placeholder="Wachtwoord"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "Het wachtwoord moet minimaal 6 karakters hebben"
                                    }
                                })}
                            />
                            {errors.password && <p className="small-error-message">Dit veld is verplicht</p> }
                        </div>

                        <div className="input-field">
                            <label htmlFor="repeat-password">Herhaal wachtwoord <br/></label>
                            <i><FontAwesomeIcon icon={faLock} /></i>
                            <input
                                id="repeat_password"
                                type="password"
                                placeholder="Herhaal wachtwoord"
                                {...register("repeat_password", {
                                    required: true,
                                    validate: value =>
                                        value === password.current || "De wachtwoorden komen niet overeen"
                                })}
                            />
                            {errors.repeat_password && <p className="small-error-message">{errors.repeat_password.message}</p> }
                            {serverError && <p className="small-error-message">Dit account bestaat al.</p> }
                        </div>


                        <button
                            type="submit"
                            className="submit-button register-button"
                        >
                            <i><FontAwesomeIcon icon={faUserPlus}/></i>
                            Registreren
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUp;