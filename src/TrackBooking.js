import React, { useState, useEffect } from 'react'
import './TrackBooking.css'; // Import the CSS file

const TrackBooking = () => {

    const [phoneNumber, setPhoneNumber] = useState(0)
    const [records, setRecords] = useState([])

    const getRecords = async () => {
        console.log(phoneNumber)
        const response = await fetch('http://localhost:3001/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber })
        });
        const result = await response.json();

        if (result.success === true) {
            setRecords((prevRecords) => {
                return result.records
            })

            console.log(result.records)
        }
    }
    const TrackBooking = ({ refreshTrigger }) => {
        const [records, setRecords] = useState([]);
        const [phoneNumber, setPhoneNumber] = useState(0);

        const getRecords = async () => {
            // existing fetch logic here
        };

        useEffect(() => {
            getRecords();
        }, [refreshTrigger]); // refresh when trigger changes

        // rest of the component as you have it
    };

    return (
        <>
            <div style={{ margin: '15px 0px 15px 0px', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <input
                    type="number"
                    placeholder="Search by phone number..."
                    value={phoneNumber === 0 ? '' : phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        fontSize: '16px',
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <button type="button" onClick={getRecords} className="submit-btn">Submit</button>

            </div>
            {records.length !== 0 ? <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Folk Guide</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>CheckinTime</th>
                            <th>Purpose</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.name}</td>
                                <td>{row.phoneNumber}</td>
                                <td>{row.folkGuidName}</td>
                                <td>{new Date(row.fromDate).toDateString()}</td>
                                <td>{new Date(row.toDate).toDateString()}</td>
                                <td>{row.checkinTime}</td>
                                <td>{row.purpose}</td>
                                <td>
                                    <td>
                                        {row.status === 'pending' && <span className="pending-badge">Pending</span>}
                                        {row.status === 'approved' && <span className="approved-badge">Approved</span>}
                                        {row.status === 'denied' && <span className="denied-badge">Denied</span>}
                                    </td>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>No records found</h1>
            </div>}
        </>
    )
}

export default TrackBooking
