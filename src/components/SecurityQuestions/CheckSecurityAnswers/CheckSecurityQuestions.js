import './CheckSecurityQuestions.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CheckSecurityQuestions = () => {

    // state to set form data
    const [ form, setForm ] = useState({});

    // state to set form errors
    const [ errors, setErrors] = useState({});
    
    //
    const history = useHistory();

    //
    function redirectToPasswordReset() {
        history.push("/resetPassword");
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
        const { staff_id, town, color } = form;
        const newErrors = {};

        // staff_id error
        if ( !staff_id || staff_id === '' ) newErrors.staff_id = 'staff id cannot be blank';
        else if ( staff_id.length < 6 ) newErrors.staff_id = 'staff id length is too short, minimum 6 digit';
        
        // password error
        if ( !town || town === '' ) newErrors.town = 'please answer question 1';
        else if ( town.length < 3 ) newErrors.town = 'answer length is too short, minimum 3 alphabet';

        // retyped password error
        if ( !color || color === '' ) newErrors.color = 'please answer question 2';
        else if ( color.length < 3 ) newErrors.color = 'answer length is too short, minimum 3 alphabet';

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

            const user_data = {
                id : form.staff_id,
                town: form.town,
                color: form.color
            }
            // console.log('user_data: ', user_data)

            // fetching data into SERVER
            const url = `http://localhost:3002/checkSecurityQuestions`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(user_data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data);
                if(data.length > 0){
                    alert( 'Answers matched, Thank You !' );
                    redirectToPasswordReset();
                }
                if(data.length < 1){
                    alert( 'Answers not matching, Please try again !' );
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
                if(error){
                    alert( 'Sorry, something went wrong, Please try again.' );
                }
            })
        }
    }

    return (
        <div className="d-flex justify-content-center loginMainDiv">
            <div className="loginDiv">
                <h5>Please Answer the Security Questions</h5>
                <hr />
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="formStaffId">
                        <Form.Label>Staff ID</Form.Label>
                        <Form.Control 
                            type="text" placeholder="your staff id here" 
                            onChange={ e => setField('staff_id', e.target.value) }
                            isInvalid={ !!errors.staff_id }     
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.staff_id }
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">Please enter your employment id</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formAnsTown">
                        <Form.Label>Question 1 : What's Your Town of Birth?</Form.Label>
                        <Form.Control 
                            type="text" placeholder="your answer here" 
                            onChange={ e => setField('town', e.target.value.toLowerCase()) }
                            isInvalid={ !!errors.town }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.town }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formAnsColor">
                        <Form.Label>Question 2 : What's Your Favourite Color?</Form.Label>
                        <Form.Control 
                            type="text" placeholder="your answer here" 
                            onChange={ e => setField('color', e.target.value.toLowerCase()) }
                            isInvalid={ !!errors.color }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.color }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" block type="submit" className="btnLogin">
                        <FontAwesomeIcon icon={faUserCheck} /> Verify Me
                    </Button>

                </Form>
            </div>
        </div>
    );
};

export default CheckSecurityQuestions;