import './UpdateJob.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import noImage from '../../../images/No_Image_Available.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faFileImage, faPenSquare } from '@fortawesome/free-solid-svg-icons';

const UpdateJob = () => {

    // using params to get the user clicked job id
    const { job_id } = useParams();
    // console.log(job_id);

    // state to set form data
    const [ form, setForm ] = useState({
        jobId: job_id,
        jobStatus: '',
        jobRemarks: '',
        file: ''
    });

    // state to set form errors
    const [ error, setError] = useState({});

    // to toggle update status button
    const [checked, setChecked] = useState(false);

    // to push back to available job when job status updated
    let history = useHistory();

    // function to set form data and errors
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // setting errors
        if ( !!error[field] ) setError({
            ...error,
            [field]: null
        })
    }


    // function to set errors and display error message
    const findFormError = () => {
        const { jobStatus, jobRemarks, file } = form;
        const newErrors = {};

        // console.log(file)

        // job status error
        if ( !jobStatus || jobStatus === '' ) newErrors.jobStatus = 'job status cannot be blank';
        else if ( jobStatus === 'NEW'  ) newErrors.jobStatus = 'job status cannot be "NEW"';
        else if ( !/COMPLETED|PENDING/.test(jobStatus) ) newErrors.jobStatus = 'job status Not Allowed';

        // job remarks error
        if ( !jobRemarks || jobRemarks === '' ) newErrors.jobRemarks = 'job remarks cannot be blank';
        else if ( jobRemarks.length < 4 ) newErrors.jobRemarks = 'remarks is too short, minimum is 4 alphabets';

        // file error
        if ( !file || file === 'undefined' ) {
            newErrors.file = 'please upload job completion image';
        }

        return newErrors;
    }


    // function to handle update job status
    const handleUpdateJobStatus = (e) => {

        // to stop invalid form submission
        e.preventDefault()
        // copying the error object
        const newError = findFormError();
        // condition to check if error having values
        if ( Object.keys(newError).length > 0){
            setError(newError)
        } else {
            // console.log(form);
            const formData = new FormData();
            formData.append("jobImage", form.file);
            formData.append("jobId", form.jobId);
            formData.append("jobStatus", form.jobStatus);
            formData.append("jobRemarks", form.jobRemarks);

            const url = `http://localhost:3002/updateJobStatus/${job_id}`;

            fetch(url, {
                method: 'PATCH',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.affectedRows > 0){
                    alert('job status updated successfully !');
                    history.push("/allJobs");
                }
            })
            .catch(error => {
                console.log('job status updating Error : ',error)
            })
        }
    }


    return (
        <div className="container p-4">
            <h4>Update Job : {job_id}</h4>
            <Form onSubmit={handleUpdateJobStatus}>
                
                <Form.Group controlId="updateJobStatus">
                    <Form.Label>Job Status</Form.Label>
                    <Form.Control 
                        type="text" placeholder="enter job status here" 
                        onChange={ e => setField('jobStatus', e.target.value.toUpperCase()) }
                        isInvalid={ !!error.jobStatus }
                        feedback={ error.jobStatus }
                    />
                    {/* to display error in a span  */}
                    <Form.Control.Feedback type='invalid'>
                        { error.jobStatus }
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        if job done then write "COMPLETED"
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="updateJobRemarks">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control 
                        type="text" placeholder="add remarks here" 
                        onChange={ e => setField('jobRemarks', e.target.value) }
                        isInvalid={ !!error.jobRemarks }
                        feedback={ error.jobRemarks }
                    />
                    {/* to display error in a span  */}
                    <Form.Control.Feedback type='invalid'>
                        { error.jobRemarks }
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="row">
                    <div className="col">
                        <Form.Group controlId="uploadJobImage">
                            <Form.Label>
                                <FontAwesomeIcon icon={faFileImage} /> Upload Job Completion Image
                            </Form.Label>
                            <Form.File 
                                type="file"
                                onChange={ e => setField('file', e.target.files[0]) }
                                isInvalid={ !!error.file }
                                feedback={ error.file }
                            />
                        </Form.Group>
                    </div>
                    <div className="col d-flex justify-content-end">
                        {
                            form.file ? 
                            <img src={URL.createObjectURL(form.file)} alt="please upload job completion proof" style={{height: "70px", width: "80px"}}/> : 
                            <img src={noImage} alt="please upload job completion proof" style={{height: "70px", width: "80px"}}/>
                        }
                    </div>
                </div>
                
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        // toggle the checked state 
                        onChange={() => setChecked(!checked)}
                        type="checkbox" 
                        label="I hereby confirm to update the job status " />
                </Form.Group>

                <div className="row">
                    <div className="col">
                    {/* conditionally rendered the update status button  */}
                    {
                        checked ?
                        <Button variant="primary" type="submit">
                            <FontAwesomeIcon icon={faPenSquare} /> Update Status
                        </Button>
                        :
                        <p style={{color: 'red'}}>please click the check-box</p>
                    }
                    </div>
                    <div className="col d-flex justify-content-end">
                        <Link to="/allJobs">
                            <Button variant="warning"><FontAwesomeIcon icon={faBackspace} /> Back to Job</Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UpdateJob;