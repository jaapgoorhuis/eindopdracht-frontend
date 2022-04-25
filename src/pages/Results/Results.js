import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import PageTitle from "../../components/PageTitle/PageTitle";
import CompareResults from "../../components/CompareResults/CompareResults";
import "./Results.css";
import {useHistory} from "react-router-dom";

function Results() {
    const history = useHistory();

    return (
        <>
            <NavBar/>
            <div className="container">
                <PageTitle
                    title="3. Resultaten"
                    description="Hierbij de top 3 resultaten."
                />
                <div className="page-content">


                            <CompareResults/>

                    <button className="submit-button absolute-button" onClick={history.goBack}>Vorige</button>

                </div>
            </div>
        </>
    )
}
export default Results;