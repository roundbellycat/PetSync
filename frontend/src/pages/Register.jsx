
import Navbar from '../components/Navbar';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

          <input
            type="text"
            placeholder="First name"
            value={formData.fname}
            onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Last namne"
            value={formData.lname}
            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Username"
            value={formData.uname}
            onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
