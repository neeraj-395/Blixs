import React, { useState } from 'react';

const Comments = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments(prev => [...prev, { username, text: newComment }]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    setComments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col space-y-2">
        {comments.length === 0 ? (
          <p className="text-white">No comments yet</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-md">
              <span className="text-white">{comment.username}: {comment.text}</span>
              <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteComment(index)}>
                Delete
              </button>
            </div>
          ))
        )}
        <div className="flex mt-2">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Add a comment..."
          />
          <button 
            className="ml-2 bg-blue-600 text-white p-2 rounded-md"
            onClick={handleAddComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
