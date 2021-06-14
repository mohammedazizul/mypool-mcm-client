import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext/UserContext';
import './Job.css'
import JobCard from './JobCard/JobCard';
// import jobData from '../../fake-data/MOCK_DATA.json'; 

const Job = () => {

    // using user context to get logged in user data
    const [user, setUser] = useContext(UserContext);
    console.log(user);

    const [pendingJobData, setPendingJobData] = useState([]);

    // to load all job data
    useEffect(() => {
        // url to fetch data from server
        const url = `http://localhost:3002/getNewAndPendingJob`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log("job data : ", data);
            setPendingJobData(data);
        })
        .catch((error) => {
            console.log("job data loading error : ", error);
        })
    }, [])

    return (
        <section>
                <div style={{textAlign: "center", backgroundColor: "steelblue"}}>
                    <p style={{color: "white", fontSize: "28px", margin: "0px", marginBottom: "0px", padding: "5px", paddingTop: "10px"}}>
                        Total assigned job: {pendingJobData.length}
                    </p>
                </div>
            <div className="jobSection">
                <div>
                    {
                        pendingJobData.map(job => <JobCard job={job} key={job.job_id}/>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Job;