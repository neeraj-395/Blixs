import React, { useState } from "react";
import { create_post } from "../services/post";

const CreatePostModel = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  if (!isOpen) return null;

  const closePopup = () => {
    setPreview(null);
    setCaption("");
    if (onClose) onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleShare = async () => {
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    if (!file || !caption) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await create_post(formData);
      closePopup();
    } catch (err) {
      console.error("Failed to share post:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#111] text-white p-6 rounded-2xl shadow-2xl w-[26rem] relative">
        <button onClick={closePopup} className="absolute top-3 right-4 text-white text-2xl hover:text-gray-300">×</button>
        <h2 className="text-2xl font-bold text-center mb-6">Create Post</h2>

        {!preview ? (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => document.getElementById("image").click()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200"
            >
              Select a file
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-4">
            <img src={preview} alt="preview" className="rounded-lg max-h-60 object-cover" />
          </div>
        )}

        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview && (
          <input
            id="caption"
            name="caption"
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            type="text"
            className="w-full text-white p-2 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        <div className="flex justify-between">
          <button
            onClick={closePopup}
            className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all duration-200"
          >
            Cancel
          </button>
          {preview && (
            <button
              onClick={handleShare}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200"
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModel;
