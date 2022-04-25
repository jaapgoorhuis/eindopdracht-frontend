import React, {useContext} from "react";
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Places from './pages/Places/Places';
import Results from './pages/Results/Results';
import WeatherConditions from './pages/WeatherConditions/WeatherConditions';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Account from "./pages/Account/Account";
import SpecificResult from "./pages/SpecificResult/SpecificResult";
import {AuthContext} from "./context/AuthContext";

function App() {

    const {isauth} = useContext(AuthContext);
return (
    <>
        <div className="content">
            <Switch>
                <Route exact path="/">
                    <SignIn/>
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/signin">
                    <SignIn />
                </Route>
                {isauth ?
                    <Route path="/places">
                        <Places/>
                    </Route>
                    :
                    <SignIn />
                }
                {isauth ?
                    <Route path="/results/:id/:type/:devation">
                        <Results/>
                    </Route>
                    :
                    <SignIn />
                }
                {isauth ?
                    <Route exact path="/account">
                        <Account/>
                    </Route>
                    :<SignIn />
                }
                {isauth ?
                    <Route exact path="/weatherconditions">
                        <WeatherConditions />
                    </Route>
                    :<SignIn />
                }

                {isauth ?
                    <Route exact path="/specific-result/:name">
                        <SpecificResult />
                    </Route>
                    :<SignIn />
                }

            </Switch>
        </div>
    </>
)
}

export default App;
