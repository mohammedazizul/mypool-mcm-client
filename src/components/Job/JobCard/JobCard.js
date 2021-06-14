import './JobCard.css'
import { useHistory } from 'react-router';
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Card, Container } from 'react-bootstrap';
import { faCalendarDay, faEdit, faMapMarkerAlt, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons'


const JobCard = (props) => {

    // console.log(props);

    // using user context to get logged in user data
    const [user, setUser] = useContext(UserContext);

    // using history to pass specific job id to update jab
    const history = useHistory();

    // for server data
    const { job_id, status, clientId, date, ptStaffName, ftStaffName, clientName, clientAddress, clientContact } = props.job;

    // converting the SQL date + time string to date only
    const jobDate = date.split('T')[0];

    // handle update status button function
    const handleUpdateStatus = (job_id) => {
        alert ("click 'OK' to process update JOB status",job_id);
        const url = `/updateJob/${job_id}`;
        history.push(url);
    }
    
    return (
        <div className="col-md-12 jobCardDiv">
            <Card className="text-center m-2">
                <Card.Header>
                    <h4>
                        JOB ID: <Badge variant="info">{job_id}</Badge> &nbsp;
                        <Badge variant="primary">{status.toUpperCase()}</Badge>
                    </h4>
                </Card.Header>
                <Card.Body className="p-2">
                    <Card.Title>
                        <p className="pText">
                            <FontAwesomeIcon icon={faCalendarDay} /> {jobDate}
                        </p>                         
                    </Card.Title>
                    <hr/>
                    <Card.Text>
                        <p className="pText"><b> Staff Details - </b></p>

                        {/* full time staff name will no be displayed for full time staff  */}
                        {
                            user.userRole !== 'full-time-staff' && 
                            <p className="pText">Full Time: {ftStaffName}</p>
                        }
                        
                        {/* part time staff name will no be displayed for part time staff  */}
                        {
                            user.userRole !== 'part-time-staff' && 
                            <p className="pText">Part Time: {ptStaffName}</p>
                        }
                    </Card.Text>
                    <hr/>
                    <Card.Text>
                        <p className="pText"><b> Client Details - </b></p>
                        <p className="pText">
                            <FontAwesomeIcon icon={faUserTie} /> Name: {clientName}
                        </p>
                        {/* contact will no be displayed for part time staff  */}
                        {
                            user.userRole !== 'part-time-staff' && 
                            <p className="pText">
                                <FontAwesomeIcon icon={faPhone} /> Contact: {clientContact}
                            </p>
                        }
                        <p className="pText">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {clientAddress}
                        </p>

                    </Card.Text>
                </Card.Body>
                {/* footer will not be displayed for part time staff */}
                {
                    user.userRole !== 'part-time-staff' && 
                    <Card.Footer className="text-muted">
                        <Container>
                        <Button 
                            variant="warning" 
                            block 
                            onClick={() => handleUpdateStatus(job_id)}
                            ><FontAwesomeIcon icon={faEdit} /> UPDATE STATUS
                        </Button>
                        </Container>
                    </Card.Footer>
                }
            </Card>
        </div>
    );
};

export default JobCard;