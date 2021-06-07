import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CompletedJob from './CompletedJob/CompletedJob';

const JobHistory = () => {

    const [completedJobData, setCompletedJobData] = useState([]);
    const [jobCount, setJobCount] = useState(0);

    // to load all completed job data
    useEffect(() => {
        // url to fetch data from server
        const url = `http://localhost:3002/getCompletedJob`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log("job data : ", data);
            setCompletedJobData(data);
            setJobCount(data.length);
        })
        .catch((error) => {
            console.log("job data loading error : ", error);
        })
    }, [])

    return (
        <div>
            <h1>Completed Job({jobCount}) List</h1>
            <div>
                {/* counter reset to add a auto increment counter in table column Sl. */}
                <Table responsive="sm" style={{counterReset: "tableCount"}}> 
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Job ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        completedJobData.map(job => <CompletedJob key={job.id} job={job} />)
                    }
                    </tbody>
                </Table>
                <p>Total Receivable Amount : RM 00.00</p>
            </div>
        </div>
    );
};

export default JobHistory;