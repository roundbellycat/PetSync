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
    password: '',
    confirmPass: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checking for spaces in username
    if (/\s/.test(formData.uname)) {
      return alert("Username cannot contain spaces")
    }

    // checking email format
    if (!/\S@\S+\.\S+/.test(formData.email)) {
      return alert("Invalid email format")
    }

    // validate passsword
    if (formData.password !== formData.confirmPass) {
      return alert("Passwords do not match")
    }

    try {
      // remove confirmpass before sending, so there is non duplicate
      const { confirmPass, ...dataToSend } = formData;

      await axiosInstance.post('/api/auth/register', dataToSend);
      alert('Registration successful. Please log in.');
      navigate('/login');

    } catch (error) {
      // show backend errors
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

          <label className="block mb-1 font-medium">First name</label>
          <input
            type="text"
            placeholder="First name"
            value={formData.fname}
            onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Last name</label>
          <input
            type="text"
            placeholder="Last name"
            value={formData.lname}
            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={formData.uname}
            onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Confirm password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPass}
            onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })}
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