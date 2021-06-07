import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { UserContext } from '../../UserContext/UserContext';
import './ResetSecurityQuestions.css'

const ResetSecurityQuestions = () => {
    // state to set form data
    const [ form, setForm ] = useState({});
    // state to set form errors
    const [ errors, setErrors] = useState({});
    // setting up the current logged in user
    const [user, setUser] = useContext(UserContext);
    console.log(user);
    //
    const history = useHistory();
    //
    function redirectToHome() {
        history.push('/home');
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
        const { town, color } = form;
        const newErrors = {};
        
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
                id : user.staffID,
                town: form.town,
                color: form.color
            }
            console.log('user_auth: ', user_data)

            // fetching data into SERVER
            const url = `http://localhost:3002/updateSecurityQuestions`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(user_data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data);
                if(data.affectedRows > 0){
                    alert( 'Questions Answers Updated Successfully, Thank You !' );
                    redirectToHome();
                }
                if(data.affectedRows === 0){
                    alert( 'Sorry, unable to update, Please try again.' );
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
                <h3>Hello {user.username},</h3>
                <h3>Reset Security Questions</h3>
                <hr />
                <Form onSubmit={handleSubmit}>

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
                        Confirm
                    </Button>

                </Form>
            </div>
        </div>
    );
};

export default ResetSecurityQuestions;