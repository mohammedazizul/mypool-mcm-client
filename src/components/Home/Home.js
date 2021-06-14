import './Home.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Image Credit => https://www.123rf.com/

const Home = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <div className="d-flex align-items-center homeMainDiv">
            <div className="container" style={{border: "2px solid white", borderRadius: "10px"}} >
                <h2>Welcome to</h2>
                <h1 style={{ color: "DarkBlue", fontWeight: "bold", fontFamily: "Courier New" }}>MyPool-CM Sdn Bhd</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non hic tempore porro repudiandae reprehenderit ipsa alias accusantium perferendis necessitatibus, accusamus autem minus. Consequuntur, ipsam quaerat. Ipsam, blanditiis? Nulla, consequuntur voluptatibus.</p>
                {
                    !user.username &&                 
                    <Link to="/login">
                        <Button variant="primary" size="lg" className="float-right" style={{marginTop: "10px"}}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Click to Login
                        </Button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Home;