import React from 'react';
import "./PageTitle.css";

function PageTitle({title, description}) {
    return (
        <>
            <div className="title-container">
                <h2 className="page-title">{title}</h2>
                <p className="page-description">{description}</p>
            </div>
        </>
    )
}

export default PageTitle;