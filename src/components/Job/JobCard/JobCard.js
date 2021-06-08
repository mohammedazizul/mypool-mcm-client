import React, { useContext } from 'react';
import './JobCard.css'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../UserContext/UserContext';
import { useHistory } from 'react-router';

const JobCard = (props) => {

    console.log(props);

    // using user context to get logged in user data
    const [user, setUser] = useContext(UserContext);

    // using history to pass specific job id to update jab
    const history = useHistory();
    
    // for fake data
    // const { id, jobStatus, fullName, address, contact, latitude, longitude, jobDate, partTimeStaff, fullTimeStaff } = props.job;

    // for server data
    const { job_id, status, clientId, date, ptStaffName, ftStaffName, clientName, clientAddress, clientContact, picture } = props.job;

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
                        Job ID: <Badge variant="info">{job_id}</Badge> &nbsp;
                        <Badge variant="primary">{status.toUpperCase()}</Badge>
                    </h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <p>Date: {date}</p> 

                        {/* full time staff name will no be displayed for full time staff  */}
                        {
                            user.userRole !== 'full-time-staff' && <p>Full Time Staff: {ftStaffName}</p>
                        }
                        
                        {/* part time staff name will no be displayed for part time staff  */}
                        {
                            user.userRole !== 'part-time-staff' && <p>Part Time Staff: {ptStaffName}</p>
                        }
                        
                    </Card.Title>
                    <hr/>
                    <Card.Text>
                        <p><b> Client Details - </b></p>
                        <p>Name: {clientName}</p>
                        {/* contact will no be displayed for part time staff  */}
                        {
                            user.userRole !== 'part-time-staff' && <p>Contact: {clientContact}</p>
                        }
                        <p>Address: {clientAddress}</p>
                        <p></p>
                        <p></p>

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
                            >UPDATE STATUS
                        </Button>
                        </Container>
                    </Card.Footer>
                }
            </Card>
        </div>
    );
};

export default JobCard;