import React from 'react';
import './CompletedJob.css';

const CompletedJob = (props) => {

    const {job_id, date, status, remarks} = props.job;

    console.log(props.job);

    // converting the SQL date + time string to date only
    const jobDate = date.split('T')[0];

    return (
        <tr>
            {/* counter-cell class to do auto increment in the column Sl. */}
            <td className="counter-cell"></td>
            <td>{job_id}</td>
            <td>{jobDate}</td>
            <td>{status.toUpperCase()}</td>
            <td>40.00</td>
            {
                remarks === null ? <td>n/a</td> : <td>{remarks}</td> 
            }
        </tr>
    );
};

export default CompletedJob;