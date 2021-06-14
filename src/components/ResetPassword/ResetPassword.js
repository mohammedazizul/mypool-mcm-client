import './ResetPassword.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';


const ResetPassword = () => {

    // state to set form data
    const [ form, setForm ] = useState({});

    // state to set form errors
    const [ errors, setErrors] = useState({});

    //
    const history = useHistory();

    // 
    function redirectToHome() {
        history.push("/home");
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
        const { staff_id, username, newPassword, retypedNewPassword } = form;
        const newErrors = {};

        // staff_id error
        if ( !staff_id || staff_id === '' ) newErrors.staff_id = 'staff id cannot be blank';
        else if ( staff_id.length < 6 ) newErrors.staff_id = 'staff id length is too short, minimum is 5 digits)';

        // name error
        if ( !username || username === '' ) newErrors.username = 'username cannot be blank';
        else if ( username.length < 3 ) newErrors.username = 'username length is too short, minimum 3 alphabets)';
        
        // password error
        if ( !newPassword || newPassword === '' ) newErrors.newPassword = 'password cannot be blank';
        else if ( newPassword.length < 6 ) newErrors.newPassword = 'password length is too short, minimum 5 character)';

        // retyped password error
        if ( !retypedNewPassword || retypedNewPassword === '' ) newErrors.retypedNewPassword = 'retyped password cannot be blank';
        else if ( retypedNewPassword.length < 6 ) newErrors.retypedNewPassword = 'retyped password length is too short, minimum 5 character';
        else if( newPassword !== retypedNewPassword ) newErrors.retypedNewPassword = 'dose not match with the password you already entered';

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

            const user_auth = {
                id : form.staff_id,
                username: form.username,
                newPassword: form.newPassword,
                newUser: false
            }
            console.log('user_auth: ', user_auth)

            // fetching data into SERVER
            const url = `http://localhost:3002/resetPassword`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(user_auth)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data);
                if(data.affectedRows > 0){
                    alert( 'Password Reset Successful, Thank You !' );
                    redirectToHome();
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
                if(error){
                    alert( 'Sorry, something went wrong, Please try again.' );
                    setForm({});
                }
            })
        }
    }


    return (
        <div className="d-flex justify-content-center loginMainDiv">
            <div className="loginDiv">
                <h3>Reset Your Password Here</h3>
                <hr />
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
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type="password" placeholder="new password" 
                            onChange={ e => setField('newPassword', e.target.value) }
                            isInvalid={ !!errors.newPassword }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.newPassword }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formRetypedNewPassword">
                        <Form.Label>Retype New Password</Form.Label>
                        <Form.Control 
                            type="password" placeholder="retype new password" 
                            onChange={ e => setField('retypedNewPassword', e.target.value) }
                            isInvalid={ !!errors.retypedNewPassword }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.retypedNewPassword }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" block type="submit" className="btnLogin">
                        <FontAwesomeIcon icon={faCheckSquare} /> CONFIRM
                    </Button>

                </Form>
            </div>
        </div>
    );
};


export default ResetPassword;