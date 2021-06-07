import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './Login.css';


const Login = () => {

    // state to set form data
    const [ form, setForm ] = useState({});
    // state to set form errors
    const [ errors, setErrors] = useState({});
    //
    const [ loginError, setLoginError ] = useState('');
    //
    const [user, setUser] = useContext(UserContext);
    //
    const history = useHistory();
    //
    const location = useLocation();
    //
    let { from } = location.state || { from: { pathname: "/" } };

    //
    function redirectToSetSecurityQuestion() {
        history.push("/setSecurityQuestions");
    }

    // function to set form data and errors
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // setting errors
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    // function to set errors and display error message
    const findFormErrors = () => {
        const { staff_id, username, password } = form;
        const newErrors = {};

        // staff_id error
        if ( !staff_id || staff_id === '' ) newErrors.staff_id = 'staff id cannot be blank';
        else if ( staff_id.length < 6 ) newErrors.staff_id = 'staff id length is too short (min > 5)';

        // name error
        if ( !username || username === '' ) newErrors.username = 'username cannot be blank';
        else if ( username.length < 3 ) newErrors.username = 'username length is too short (min > 3)';
        
        // password error
        if ( !password || password === '' ) newErrors.password = 'password cannot be blank';
        else if ( password.length < 6 ) newErrors.password = 'password length is too short (min > 5)';

        return newErrors;
    }

    // to handle form submission
    const handleSubmit = e => {
        // to stop invalid form submission
        e.preventDefault()
        // copying the error object
        const newErrors = findFormErrors();
        // condition to check if error having values
        if ( Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        } else {
            const url = `http://localhost:3002/validateUserLogin`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(form)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                if (data.length === 0) {    // if the response from server is empty
                    alert( "Invalid id/username/password !" );
                    //
                    increaseInvalidAttempt();
                }
                else{
                    const userInfo = {
                        staffID: data[0].userId,
                        username: data[0].username,
                        userRole: data[0].role,
                        userStatus: data[0].userStatus,
                        newUser: data[0].newUser
                    };
                    setUser(userInfo);
    
                    console.log(data[0].newUser);
                    console.log(data[0].userStatus);
                    
                    if (data[0].userStatus > 3) {
                        alert( "account blocked ! \nPlease contact Head Office, Thank You");
                        setUser({});
                        history.push("/home");
                    }
    
                    if(data[0].newUser){
                        redirectToSetSecurityQuestion();
                    }
                    else {
                        history.replace(from);
                    }
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
        }
    }


    // to increase user status for invalid login
    const increaseInvalidAttempt = () => {
        const url = `http://localhost:3002/increaseUserStatus`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    }


    // to handle user logout
    const handleLogout = () => {
        const userInfo = {
            staffID: "",
            username: "",
            userRole: ""
        };
        setUser(userInfo);
        setForm({});
        alert( 'Successfully Logged Out' );
        history.push("/home");
    }

    return (
        <div className="d-flex justify-content-center loginMainDiv">
            <div className="loginDiv">
                <Form onSubmit={handleSubmit}>
                    {
                        !user.username && 
                        <div>
                            <Form.Group controlId="formStaffId">
                                <Form.Label>Staff ID</Form.Label>
                                <Form.Control 
                                    type="text" placeholder="staff id" 
                                    onChange={ e => setField('staff_id', e.target.value) }
                                    isInvalid={ !!errors.staff_id }     
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.staff_id }
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">Please enter your employment id</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formUserName">
                                <Form.Label>User name</Form.Label>
                                <Form.Control 
                                    type="text" placeholder="user name" 
                                    onChange={ e => setField('username', e.target.value) }
                                    isInvalid={ !!errors.username }     
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.username }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" placeholder="password" 
                                    onChange={ e => setField('password', e.target.value) }
                                    isInvalid={ !!errors.password }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.password }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    }

                    {
                        user.username ? 
                        <Button variant="danger" block onClick={handleLogout} className="btnLogin">Logout</Button> :
                        <Button variant="primary" block type="submit" className="btnLogin">Login</Button>
                    }
                    <p style={{color: 'red'}}>{loginError}</p>
                </Form>

                <div style={{textAlign: 'center'}}>
                    <Link to="/checkSecurityQuestions">
                        {
                            user.username ? <p>reset password</p> : <p>forgot password</p>
                        }
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;