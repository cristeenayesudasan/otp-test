import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from '../src/welcome';

function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      setShowOtpForm(true);
      alert('OTP sent to your email!');
    } catch (error) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert('OTP verified successfully!');
      navigate('/welcome');  
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      {!showOtpForm ? (
        <div>
          <h2>Enter your Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={handleSendOTP}>Send OTP</button>
        </div>
      ) : (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}
