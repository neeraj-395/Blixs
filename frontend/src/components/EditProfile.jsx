import React from "react";
import { edit_user } from "../services/user";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);
    const response = await edit_user(formData);

    if (!response.success) {
      alert('Unable to update profile!');
      window.location.reload();
    } else {
      alert('Profile update successful!');
      navigate('/user');
    }
  };

  return (
    <>
      <div className="bg-black">
        <div className="flex flex-row-reverse min-h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
            <form id='form' className="bg-black p-6 rounded-3xl border-2 border-gray-400 shadow-lg w-110">
              <h2 className="text-3xl font-bold text-white mt-0 mb-6 text-center h-font">Edit Profile</h2>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full p-2 mb-3 border rounded bg-white"
              />

              <input type="text" name="bio" placeholder="Enter Bio" className="w-full p-2 border rounded mb-3 text-black bg-white" />

              <input type="text" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3 text-black bg-white" />

              <div className="w-full mb-3 bg-white">
                <select name="gender" className="w-full p-2 border rounded">
                  <option value="" disabled>Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <button type="submit"
                onClick={handleSubmit}
                className=" w-full bg-blue-500 text-white fw-bold py-2 rounded hover:bg-blue-600 mb-3 h-font">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
