import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    confirm_password: '',
    name: '',
    email: '',
    gender: '',
    profile_pic: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <label className="block mb-2">User ID *</label>
        <input type="text" name="user_id" required onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Password *</label>
        <input type="password" name="password" required onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Confirm Password *</label>
        <input type="password" name="confirm_password" required onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Full Name</label>
        <input type="text" name="name" onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Email</label>
        <input type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Phone Number</label>
        <input type="tel" name="phone" onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Date of Birth</label>
        <input type="date" name="dob" onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <label className="block mb-2">Address</label>
        <input type="text" name="address" onChange={handleChange} className="w-full p-2 border rounded mb-3" />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
