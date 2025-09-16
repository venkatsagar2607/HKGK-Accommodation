import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        folkGuidName: '',
        fromDate: '',
        toDate: '',
        checkinTime: '',
        checkoutTime:'',
        yourPhoto: null,
        aadharNumber: '',
        aadharImage: null,
        purpose: '',
    });

    const [disabled, setDisabled] = useState(false);
    const nav = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const trackChange = () => {
        nav('/track-booking');
    };

    // Function to validate Aadhaar number via ApyHub API
    // const validateAadhaar = async (aadhaar) => {
    //     try {
    //         const response = await fetch('https://api.apyhub.com/validate/aadhaar', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'apy-token': '',
    //             },
    //             body: JSON.stringify({ aadhaar }),
    //         });
    //         const result = await response.json();
    //         return result.data === true;
    //     } catch (error) {
    //         console.error('Aadhaar validation error:', error);
    //         return false;
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        // Aadhaar validation before submitting form
        // const isValidAadhaar = await validateAadhaar(formData.aadharNumber);
        // if (!isValidAadhaar) {
        //     alert('Invalid Aadhaar Number. Please check and try again.');
        //     setDisabled(false);
        //     return;
        // }

        // Prepare JSON data (since backend expects JSON)
        const submissionData = { ...formData };
        // If you have files (yourPhoto, aadharImage), handle separately; currently omitted

        try {
            const response = await fetch('https://hkgk-temple-server.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Booking request sent!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            alert('Request failed: ' + err.message);
        } finally {
            setDisabled(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="booking-form">
                <button type="button" onClick={trackChange} className="track-btn">
                    Track Booking
                </button>
                <h2>
                    Hare Krishna Gokula Kshetram <i>FOLK</i> Accomadation
                </h2>
                <p style={{ fontStyle: 'italic' }}>A home away from home</p>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="folkGuidName">Folk Guide Name</label>
                    <select id="folkGuidName" name="folkGuidName" value={formData.folkGuidName} onChange={handleChange}>
                        <option value="">Select your Folk Guide</option>
                        <option value="HG Vamshidhara Dasa">HG Vamshidhara Prabhu</option>
                        <option value="HG Vilasa Vigraha Dasa">HG Vilasa Vigraha Prabhu</option>
                        <option value="HG Vaikunta Naryana Dasa">HG Vaikunta Naryana Prabhu</option>
                        <option value="HG Mahakratu Dasa">HG Maha Kratu Prabhu</option>
                        <option value="HG Yadunandana Krishna Dasa">HG Yadunandana Krishna Prabhu</option>
                        <option value="HG Shyama Rupa Dasa">HG Shyama Rupa Prabhu</option>
                        <option value="HG Govind Gopala Dasa">HG Govind Gopala Prabhu</option>
                        <option value="HG Raktaka Keshava Dasa">HG Raktaka Keshava Prabhu</option>
                        <option value="HG Pardhamitra Prabhu Dasa">HG Pardhamitra Prabhu</option>
                        <option value="HG Chaitanya Vallabha Prabhu Dasa">HG Chaitanya Vallabha Prabhu</option>
                        <option value="HG Raghunandana Prabhu Dasa">HG Raghunandana Prabhu</option>
                        <option value="HG Phalguna Prabhu Dasa">HG Phalguna Prabhu</option>
                        <option value="HG Shesha Narayana Dasa">HG Shesha Narayana Prabhu</option>
                        <option value="HG Hridaya Chaitanya Dasa">HG Hridaya Chaitanya Prabhu </option>
                        <option value="HG Keshava Prasada Dasa">HG Keshava Prasada Prabhu</option>
                        <option value="HG Natavara Krishna Dasa">HG Natavara Krishna Prabhu</option>
                    </select>
                </div>

                <div className="form-group date-group">
                    <div className="date-field">
                        <label htmlFor="fromDate">From Date</label>
                        <input type="date" id="fromDate" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
                    </div>
                    <div className="date-field">
                        <label htmlFor="toDate">To Date</label>
                        <input type="date" id="toDate" name="toDate" value={formData.toDate} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="checkinTime">Check-in Time</label>
                    <input type="time" id="checkinTime" name="checkinTime" value={formData.checkinTime} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="checkoutTime">Check-out Time</label>
                    <input type="time" id="checkoutTime" name="checkoutTime" value={formData.checkoutTime} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label type='number' htmlFor="aadharNumber" maxlength="12"
                    >Aadhar Number</label>
                    <input type="text" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="purpose">Purpose</label>
                    <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required>
                        <option value="">-- Select purpose --</option>
                        <option value="Weekend Volunteering">Weekend Volunteering</option>
                        <option value="Festival Volunteering">Festival Volunteering</option>
                        <option value="Outstation FOLK Visit">Outstation FOLK Visit</option>
                        <option value="Mangal Arati">Mangal Arati</option>
                        <option value="Personal Purpose">Personal Purpose</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn" disabled={disabled}>
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
