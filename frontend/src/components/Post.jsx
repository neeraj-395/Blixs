import React, { useState } from 'react';
import { BsFillHeartFill, BsFillChatFill, BsBookmarkFill, BsFillCursorFill } from 'react-icons/bs';
import { like_post } from '../services/post';

const Post = ({ id, username, likes_count, caption, time_ago, image_url }) => {
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(likes_count);

  const handleLike = async (postId) => {
    const res = await like_post(postId);
    if (!res.success) return;
  
    setLikedByUser(res.isliked);
    setLikesCount(prev => prev + (res.isliked ? 1 : -1));
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
          <button className="text-white my-4 hover:text-gray-400"><BsFillChatFill /></button>
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

      </div>
    </div>
  );
};

export default Post;
