import React, { useState } from 'react';
import { BsFillHeartFill, BsFillChatFill, BsBookmarkFill, BsFillCursorFill } from 'react-icons/bs';
import axios from 'axios';

const Post = ({ id, username, likes_count, caption, time_ago, image_url, userId }) => {
  // State to track likes count and whether the current user has liked the post
  const [likes, setLikes] = useState(likes_count);
  const [likedByUser, setLikedByUser] = useState(false); // New state to track if the current user has liked the post

  const handleLike = async (postId) => {
    if (likedByUser) {
      console.log("You've already liked this post.");
      return; // Prevent multiple likes by the same user
    }

    try {
      // Send the like request to the backend
      const response = await axios.get(`/api/posts/${postId}/like`, {
        withCredentials: true, // Include credentials (cookies, auth tokens, etc.)
      });

      if (response.status === 200) {
        console.log('Post liked successfully!');
        setLikes((prevLikes) => prevLikes + 1); // Increment the like count
        setLikedByUser(true); // Set the likedByUser state to true
      } else {
        console.error('Failed to like post:', response.status);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
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
        <img src={image_url || `https://picsum.photos/600/600?randome=${id}`} alt="Post" 
         className="w-full rounded-md mb-3 border-1 border-gray-500" />

        {/* Actions */}
        <div className="flex space-x-4 text-2xl mb-2 text-white">
          <button
            className="text-white my-4 hover:text-red-800"
            onClick={() => handleLike(id)} // Only call if not already liked
            disabled={likedByUser} // Disable the like button if user has already liked
          >
            <BsFillHeartFill />
          </button>
          <button className="text-white my-4 hover:text-gray-400"><BsFillChatFill /></button>
          <button className="text-white my-4 hover:text-gray-400"><BsFillCursorFill /></button>
          <button className="text-white my-4 hover:text-gray-400 ml-auto"><BsBookmarkFill /></button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1 text-white">{likes} likes</div>

        {/* Caption */}
        <div className="text-sm text-white">
          <span className="font-semibold">{username}</span> {caption}
        </div>

        {/* Time */}
        <div className="text-xs text-white mt-1">{time_ago}</div>
      </div>
    </div>
  );
};

export default Post;
