import React from 'react';
import './CompletedJob.css'

const CompletedJob = (props) => {

    const {id, date, jobStatus, remarks} = props.job;

    return (
        <tr>
            {/* counter-cell class to do auto increment in the column Sl. */}
            <td className="counter-cell"></td>
            <td>{id}</td>
            <td>{date}</td>
            <td>{jobStatus}</td>
            <td>00.00</td>
            <td>{remarks}</td>
        </tr>
    );
};

export default CompletedJob;