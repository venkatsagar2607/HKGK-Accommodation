import React from 'react';
import BookingForm from './BookingForm'; // Correct path to your component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackBooking from './TrackBooking';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BookingForm />}></Route>
        <Route exact path="/track-booking" element={<TrackBooking />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>

      </Routes>
    </Router>
  );
}

export default App;