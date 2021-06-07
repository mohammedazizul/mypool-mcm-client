import React, { useContext } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.ico';
import { Badge, Nav, Navbar } from 'react-bootstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../UserContext/UserContext';

const Navigation = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link to="home">
                <Navbar.Brand>
                    <img src={logo} alt="logo"/> MyPool-MCM
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link to="/home" className="navLink">HOME</Link>
                    </Nav.Link>

                    {/* this div will be available only if user in logged in */}
                    {
                        user.username &&
                        <div>
                            <Nav.Link>
                                <Link to="/allJobs" className="navLink">JOB</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/jobHistory" className="navLink">HISTORY</Link>
                            </Nav.Link>
                        </div>
                    }

                    {/* conditional for the admin only */}
                    {
                        user.userRole === 'admin' &&          
                        <Nav.Link>
                            <Link to="/register" className="navLink">REGISTER</Link>
                        </Nav.Link>
                    }
                    {/* conditional for the logged in user only */}
                    {
                        user.username &&          
                        <Nav.Link>
                            <Link to="/resetSecurityQuestions" className="navLink">Update Security Questions</Link>
                        </Nav.Link>
                    }
                </Nav>
                <Nav>
                    <Nav.Link>
                        <Link to="/login" className="navLink">
                            {
                                user.username ? 
                                <h4>
                                <Badge variant="primary">
                                    <FontAwesomeIcon icon={faUser} color="green"/>&nbsp;{user.username}
                                </Badge>
                                </h4>
                                :
                                <h4>
                                <Badge variant="primary">
                                    <FontAwesomeIcon icon={faUser} color="white"/>
                                </Badge>
                                </h4>
                            }
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                        {
                            user.username 
                            ? <Link to="/login" className="navLink">LOGOUT</Link>
                            : <Link to="/login" className="navLink">LOGIN</Link>
                        }
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;