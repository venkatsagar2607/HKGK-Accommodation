import React, { useEffect, useState } from 'react';
import { RefreshCcw, CheckCircle, XCircle, Search } from 'lucide-react';
import './Admin.css';

const App = () => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  // Admin page states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBookingData = async () => {
    try {
      const response = await fetch('http://localhost:3001/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });
      const result = await response.json();

      if (result.success) {
        setBookings(result.records);
      } else {
        setError(result.error || "Failed to fetch booking records.");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Failed to connect to the server. Is it running on port 3001?");
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getBookingData();
  }, [])

  // Dummy login validation
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(null);

    // Replace this with real validation or API call
    if (username === 'ntkd' && password === 'Ntkd@#123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn','true');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };
  useEffect(() => {
  
  getBookingData();
}, []);


  const fetchBookings = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number to search.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });
      const result = await response.json();

      if (result.success) {
        setBookings(result.records);
      } else {
        setError(result.error || "Failed to fetch booking records.");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Failed to connect to the server. Is it running on port 3001?");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (phoneNumber, newStatus) => {
    console.log(phoneNumber);
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, status: newStatus })
      });
      const result = await response.json();

      if (result.success) {
        await fetchBookings();
      } else {
        setError(result.error || "Failed to update booking status.");
      }
    } catch (e) {
      console.error("Update error:", e);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    // Render login form
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    );
  }

  // Render admin dashboard if logged in
  return (
    <div className="admin-page-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
      </header>

      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter phone number to search..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="search-input"
          />
          <button
            onClick={fetchBookings}
            className="search-button"
            disabled={loading}
          >
            {loading ? (
              <RefreshCcw className="icon loading-icon" />
            ) : (
              <Search className="icon" />
            )}
            Search
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p className="error-title">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {bookings.length > 0 ? (
          <div className="bookings-grid">
            {bookings.map(booking => (
              <div key={booking.phoneNumber} className="booking-card">
                <h3 className="booking-name">{booking.name}</h3>
                <div className="booking-details">
                  <p><span className="detail-label">Phone:</span> {booking.phoneNumber}</p>
                  <p><span className="detail-label">Guide:</span> {booking.folkGuidName || 'N/A'}</p>
                  <p><span className="detail-label">Dates:</span> {booking.fromDate} to {booking.toDate}</p>
                  <p><span className="detail-label">Check-in:</span> {booking.checkinTime}</p>
                  <p><span className="detail-label">Purpose:</span> {booking.purpose}</p>
                </div>

                <div className="button-group">
                  <button
                    onClick={() => updateBookingStatus(booking.phoneNumber, 'approved')}
                    className="approve-button"
                    disabled={loading}
                  >
                    <CheckCircle className="icon" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.phoneNumber, 'denied')}
                    className="deny-button"
                    disabled={loading}
                  >
                    <XCircle className="icon" />
                    <span>Deny</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-records">
            <h3 className="no-records-title">No Booking Records</h3>
            <p className="no-records-text">Enter a phone number to search for bookings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
