import React, { useState } from 'react';
import { BsFillHeartFill, BsFillChatFill, BsBookmarkFill, BsFillCursorFill } from 'react-icons/bs';
import { like_post } from '../services/post';

const Post = ({ id, username, likes_count, caption, time_ago, image_url }) => {
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]); // Store comments here
  const [newComment, setNewComment] = useState(''); // Store new comment text

  const handleLike = async (postId) => {
    const res = await like_post(postId);
    if (!res.success) return;
  
    setLikedByUser(res.isliked);
    setLikesCount(prev => prev + (res.isliked ? 1 : -1));
  };

  const handleCommentToggle = () => {
    setShowComments(prev => !prev);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments(prevComments => [...prevComments, { username, text: newComment }]);
      setNewComment(''); // Clear the input field
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="flex flex-row">
      <div className="bg-black rounded-md shadow-md mb-6 p-4 w-full max-w-xl border-b-1 border-gray-500">
        
        {/* Header */}
        <div className="flex items-center mb-3">
          <img src={`https://robohash.org/${id}.png`} alt="Profile" className="w-10 h-5 rounded-full mr-3" />
          <span className="font-semibold text-white">{username}</span>
        </div>

        {/* Image */}
        <img src={image_url || `https://picsum.photos/600/600?random=${id}`} alt="Post" 
          className="w-full rounded-md mb-3 border-1 border-gray-500" />

        {/* Actions */}
        <div className="flex space-x-4 text-2xl mb-2 text-white">
          <button 
            className={`my-4 ${likedByUser ? 'text-red-600' : 'text-white'} hover:text-red-800`}
            onClick={() => handleLike(id)}
          >
            <BsFillHeartFill />
          </button>
          <button className="text-white my-4 hover:text-gray-400" onClick={handleCommentToggle}>
            <BsFillChatFill />
          </button>
          <button className="text-white my-4 hover:text-gray-400"><BsFillCursorFill /></button>
          <button className="text-white my-4 hover:text-gray-400 ml-auto"><BsBookmarkFill /></button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1 text-white">{likesCount} likes</div>

        {/* Caption */}
        <div className="text-sm text-white">
          <span className="font-semibold">{username}</span> {caption}
        </div>

        {/* Time */}
        <div className="text-xs text-white mt-1">{time_ago}</div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            <div className="flex flex-col space-y-2">
              {/* Display Existing Comments */}
              {comments.length === 0 ? (
                <p className="text-white">No comments yet</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-md">
                    <span className="text-white">{comment.username}: {comment.text}</span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteComment(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}

              {/* Add New Comment */}
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
        )}
      </div>
    </div>
  );
};

export default Post;
