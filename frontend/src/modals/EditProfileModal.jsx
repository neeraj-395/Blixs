import React from "react";
import { edit_user } from "../services/user";

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const response = await edit_user(formData);

    if (!response.success) alert("Unable to update profile!");
    else alert("Profile update successful!");
    onClose(); window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl hover:text-red-500"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {/* Form */}
        <form id="form" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full px-4 py-2 border rounded bg-white text-sm"
          />
          <input
            type="text"
            name="bio"
            placeholder="Enter Bio"
            className="w-full px-4 py-2 border rounded bg-white text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded bg-white text-sm"
          />
          <select
            name="gender"
            className="w-full px-4 py-2 border rounded bg-white text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
