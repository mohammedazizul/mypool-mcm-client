import './NoMatch.css';
import React from 'react';
import sad from '../../images/sad emoji.png';

const NoMatch = () => {
    
    return (
        <div className="noMatchDiv">
            <h2>We are Sorry</h2>
            <img src={sad} alt="mem logo"/>
            <h1>ERROR : 404</h1>
            <h2>Page not found</h2>
            <p>The Page you are looking for dose not exists or an another error occurred</p>
            <a href="/home">Back to Home</a>
        </div>
    );
};

export default NoMatch;