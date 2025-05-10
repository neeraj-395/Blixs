import React from "react";
import { delete_post } from "../services/post";

const DeletePostModal = ({ id, onDeleteSuccess, onClose }) => {
  const handleDelete = async () => {
    const res = await delete_post(id);
    if (res.success) onDeleteSuccess();
    else alert("Failed to delete the post");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white p-6 rounded-md shadow-lg text-black max-w-sm w-full">
        <p className="mb-4">Are you sure you want to delete this post?</p>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
