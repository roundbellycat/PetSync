import Navbar from '../components/Navbar';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          fname: response.data.fname,
          lname: response.data.lname,
          uname: response.data.uname,
          email: response.data.email,
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile. Please try again.');
      // Check for backend unique constraint error
      const msg = error.response?.data?.message;
      if (msg?.includes('uname')) {
        alert('Username is already taken.');
      } else if (msg?.includes('email')) {
        alert('Email is already taken.');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>

          {/* first and last name row*/}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">First name</label>
              <input
                type="text"
                placeholder="First name"
                value={formData.fname}
                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Last name</label>
              <input
                type="text"
                placeholder="Last name"
                value={formData.lname}
                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
            </div>
          </div >

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

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form >
      </div >
    </>
  );
};

export default Profile;