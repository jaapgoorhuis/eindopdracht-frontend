import React, {useContext} from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./NavBar.css";
import {AuthContext} from "../../context/AuthContext";
function NavBar() {
    const history = useHistory();
    const {logOut, user} = useContext(AuthContext);

    return (
        <nav>
            <div>
                <>
                    <button
                        type="button"
                        className="navbar-buttons"
                        onClick={() => history.push('/places')}
                    >
                        Home
                    </button>

                    <button
                        type="button"
                        className="navbar-buttons"
                        onClick={() => history.push('/account')}
                    >
                        Mijn account
                    </button>

                    <button
                        type="button"
                        className="navbar-buttons"
                        onClick={logOut}
                    >
                        Uitloggen
                    </button>
                </>
            </div>
        </nav>
    );
}

export default NavBar;