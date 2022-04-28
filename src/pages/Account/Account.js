import React, {useContext, useEffect, useRef, useState} from "react";
import NavBar from "../../components/NavBar/NavBar";
import PageTitle from "../../components/PageTitle/PageTitle";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

function Account() {
    const {user} = useContext(AuthContext);
    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    const [inputs, setInputs] = useState({
        status:'pending',
    });
    const [succesMessage, toggleSuccesMessage] = useState(false);

    const [userData, setUserData] = useState({
        status:'pending',
    });

    const token = localStorage.getItem('token');
    const [serverError, toggleServerError] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");
    console.log('ERRORS', errors);

    async function editUser(data) {
        toggleServerError(false);
        toggleSuccesMessage(false);
        try {
            await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', {
                    email: data.email,
                    password: data.password,
                    repeatedPassword: data.repeatedPassword,
                },
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }}
            );
            setInputs( {
                ...inputs,
                status: 'done',
            });

            toggleSuccesMessage(true);
        }

        catch(e) {
            console.error(e);
            console.log(e.response);
            setInputs( {
                ...inputs,
                status: 'done',
            });
            toggleServerError(true);
        }
    }

    useEffect(()=> {
        async function getdata() {
            try {
                const userdata = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserData({
                    ...userData,
                    email:userdata.data.email,
                    status:'done',
                });
            }
            catch(e) {
                    console.log(e.response);
                    setUserData({
                        ...userData,
                        status:'done',
                    });
            }
        }
        getdata();
    },[]);

    return (
        <>
            <NavBar/>
            <div className="container">
                <PageTitle
                    title={`Account - `+user.username}
                    description="Pas hier je account gegevens aan."
                />
                <div className="page-content">
                    {userData.status === 'done' &&
                    <form className="edit-user-form" onSubmit={handleSubmit(editUser)}>
                        <div className="input-field">
                            <label htmlFor="email">Email adres <br/></label>
                            <i><FontAwesomeIcon icon={faAt}/></i>
                            <input
                                id="email"
                                type="text"
                                defaultValue={userData.email}
                                placeholder="Email adres"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Dit email adres is niet geldig"
                                    }
                                })}
                            />
                            {errors.email && <p className="small-error-message">{errors.email.message}</p>}
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Wachtwoord <br/></label>
                            <i><FontAwesomeIcon icon={faLock}/></i>
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
                            {errors.password && <p className="small-error-message">Dit veld is verplicht</p>}
                        </div>

                        <div className="input-field">
                            <label htmlFor="repeat-password">Herhaal wachtwoord <br/></label>
                            <i><FontAwesomeIcon icon={faLock}/></i>
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
                            {errors.repeat_password &&
                            <p className="small-error-message">{errors.repeat_password.message}</p>}
                            {serverError && <p className="small-error-message">Dit account bestaat al.</p>}
                        </div>
                        {succesMessage &&
                            <div className="succes-message">Gelukt! De gegevens zijn aangepast</div>
                        }
                        <button
                            type="submit"
                            className="submit-button register-button"
                        >
                            <i><FontAwesomeIcon icon={faUserPlus}/></i>
                            Opslaan
                        </button>
                    </form>
                    }

                </div>
            </div>
        </>
    )
}

export default Account;