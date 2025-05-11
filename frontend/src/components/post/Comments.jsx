import React, { useState } from 'react';
import { create_comment, delete_comment } from '../../services/post';

const Comments = ({ postid, comment_list}) => {
  const [comments, setComments] = useState(comment_list);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    const result = await create_comment(postid, {commented_text: newComment});
    if (!result.success) { alert('Failed to add new comment!'); return; }
    setComments(prev => [...prev, result.data]);
    setNewComment('');
  };

  const handleDeleteComment = async (comment_id) => {
    const result = await delete_comment(comment_id);
    if (!result.success) { alert('Unable to delete comment!'); return; }
    setComments(prev => prev.filter(comment => comment.id !== comment_id));
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col space-y-2">
        {comments.length === 0 ? (
          <p className="text-white">No comments yet</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-md">
              <span className="text-white">{comment.username}: {comment.commented_text}</span>
              {comment.is_owner && <button className="text-red-600 hover:text-red-800" 
                onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>}
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
