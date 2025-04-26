import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    ProfilePic: "",
    Bio: "",
  });

  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //const handleSubmit = async (e) => {
    

  return (
    <>
    <div className="bg-black">
    <div className ="flex flex-row-reverse min-h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <form className="bg-black p-6 rounded-3xl border-2 border-gray-400 shadow-lg w-110">
        <h2 className="text-3xl font-bold text-white mt-0 mb-6 text-center h-font">Edit Profile</h2>
        <input 
          type="file" 
          name="ProfilePic" 
          accept="image/*" 
          onChange={handleChange} 
          className="w-full p-2 mb-3 border rounded bg-white" 
        />
        
        <input type="text" name="Bio" placeholder="Enter Bio" onChange={handleChange} className="w-full p-2 border rounded mb-3 text-black bg-white" />

        <input type="text" name="Email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-3 text-black bg-white" />

        <div className="w-full mb-3 bg-white">
          <select 
            name="gender" 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

       <button type="submit" className=" w-full bg-blue-500 text-white fw-bold py-2 rounded hover:bg-blue-600 mb-3 h-font">Submit</button>
      </form>
    </div>
    </div>
    </div>
    </>
  );
};

export default EditProfile;
