import React, { useState } from "react";
import { create_post } from "../services/post";

const PostPickPopup = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState(""); 

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
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 flex flex-col h-auto">
            <h2 className="text-lg font-semibold">Create Post</h2>

            {!preview && (
              <div className="flex justify-center items-center flex-1 mb-4">
                <button
                  onClick={() => document.getElementById("image").click()}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Select a file
                </button>
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
              <div className="flex justify-center items-center mb-4">
                <img src={preview} alt="preview" className="rounded max-h-80" />
              </div>
            )}
            
            {preview && (
              <input
                id="caption"
                name="caption"
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)} 
                value={caption}
                type="text"
                className="text-black border-2 border-gray-800 p-2 rounded mb-4"
              />
            )}
            
            <div className="flex justify-between mt-auto">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              {preview && (
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Share
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostPickPopup;
