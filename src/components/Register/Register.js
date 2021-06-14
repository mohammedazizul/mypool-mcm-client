import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    
    // state to set form data
    const [ form, setForm ] = useState({});

    // state to set form errors
    const [ errors, setErrors] = useState({});

    // to reload the page
    const reloadPage = () => {
        window.location.reload(false);
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
        const { staff_id, username, password, retypedPassword } = form;
        const newErrors = {};

        // staff id error
        if ( !staff_id || staff_id === '' ) newErrors.staff_id = 'staff id cannot be blank';
        else if ( staff_id.length < 6 ) newErrors.staff_id = 'staff id length is too short (min > 5)';

        // name error
        if ( !username || username === '' ) newErrors.username = 'username cannot be blank';
        else if ( username.length < 3 ) newErrors.username = 'username length is too short (min > 3)';
        
        // password error
        if ( !password || password === '' ) newErrors.password = 'password cannot be blank';
        else if ( password.length < 6 ) newErrors.password = 'password length is too short (min > 5)';

        // retyped password error
        if ( !retypedPassword || retypedPassword === '' ) newErrors.retypedPassword = 'retyped password cannot be blank';
        else if ( retypedPassword.length < 6 ) newErrors.retypedPassword = 'retyped password length is too short (min > 5)';
        else if( password !== retypedPassword ) newErrors.retypedPassword = 'dose not match with the password you already entered';

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
            // console.log('Form Data: ', form)

            // fetching data into SERVER
            const url = `http://localhost:3002/registerNewUser`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(form)
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Success: ', data);
                if(data.affectedRows > 0){
                    alert( 'Registration Successful, Thank You !' );
                    setForm({});
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
                if(error){
                    alert( 'Sorry, something went wrong, Please try again.' );
                    setForm({});
                    reloadPage();
                }
            })
        }
    }

    return (
        <div className="d-flex justify-content-center loginMainDiv">
            <div className="loginDiv">
                <h2>Register Here</h2>
                <Form onSubmit={handleSubmit}>

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
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" placeholder="user name" 
                            onChange={ e => setField('username', e.target.value) }
                            isInvalid={ !!errors.username }     
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.username }
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">Please enter your username</Form.Text>
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

                    <Form.Group controlId="formRetypedPassword">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control 
                            type="password" placeholder="retype password" 
                            onChange={ e => setField('retypedPassword', e.target.value) }
                            isInvalid={ !!errors.retypedPassword }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.retypedPassword }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" block type="submit" className="btnLogin">
                        <FontAwesomeIcon icon={faCheckSquare} /> Register
                    </Button>

                </Form>
            </div>
        </div>
    );
};

export default Register;