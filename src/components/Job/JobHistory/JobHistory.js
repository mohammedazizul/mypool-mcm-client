import { Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import CompletedJob from './CompletedJob/CompletedJob';
import { useContext } from 'react';
import { UserContext } from '../../UserContext/UserContext';

const JobHistory = () => {

    const [ user, setUser] = useContext(UserContext);
    // console.log(user);

    const [completedJobData, setCompletedJobData] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [payable, setPayable] = useState(0);

    // to load all completed job data
    useEffect(() => {
        // url to fetch data from server
        const url = `http://localhost:3002/getCompletedJob`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            // console.log("job data : ", data);
            setCompletedJobData(data);
            setJobCount(data.length);
            setPayable(data.length*40);
        })
        .catch((error) => {
            console.log("job data loading error : ", error);
        })
    }, [])

    return (
        <div>
            <h1>Completed Job(s) List ({jobCount})</h1>
            <div>
                {/* counter reset to add a auto increment counter in table column Sl. */}
                <Table responsive="sm" style={{counterReset: "tableCount"}}> 
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Job ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            {
                                (user.userRole === 'part-time-staff') && <th>Amount (RM)</th>
                            }
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        completedJobData.map(job => <CompletedJob key={job.job_id} job={job} />)
                    }
                    </tbody>
                </Table>
                {
                    (user.userRole === 'part-time-staff') && <p>Total Receivable Amount : <b>RM {payable}.00</b></p>
                }
            </div>
        </div>
    );
};

export default JobHistory;