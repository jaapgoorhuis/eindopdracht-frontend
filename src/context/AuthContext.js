import React, {useState, useEffect, createContext} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [Auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
        apikey: '654b427c407676476a170bec7c42758d',
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        //check ff of token verlopen is ...
        if(token) {
            const decodedToken = jwt_decode(token);
            fetchUserData(decodedToken, token);
        }
        else {
            console.log('test');
            toggleAuth({
                ...Auth,
                status: 'done',
            });
        }
    },[]);

    const history = useHistory();

    const data = {
        isauth: Auth.isAuth,
        user: Auth.user,
        logIn: signIn,
        logOut: signOut,
        ApiKey: Auth.apikey,
    }

    async function fetchUserData(decodedToken, token) {
        try {
            console.log(token);
            const userdata = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            const user = userdata.data;
            toggleAuth({
                ...Auth,
                isAuth: true,
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
                status: 'done',
            });

        } catch (e) {
            console.log('error');
            toggleAuth({
                ...Auth,
                status:'done',
            })
        }
    }

    function signIn(data) {
        const token = data.accessToken;
        const decodedToken = jwt_decode(token);
        fetchUserData(decodedToken, token);
        console.log('Gebruiker is ingelogd!');
        localStorage.setItem('token', token);
        history.push('/places');

    }

    function signOut() {
        toggleAuth(() => ({
            isAuth:false,
            status:'done',
        }));
        localStorage.clear();
        console.log('gebruiker is uitgelogd!');
        history.push('/');
    }

    return (
        <AuthContext.Provider value={data}>
            {Auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;