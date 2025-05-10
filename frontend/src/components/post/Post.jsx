import React, { useState } from 'react';
import Comments from './Comments';
import { like_post } from '../../services/post';
import PostActions from './PostAction';

const Post = ({ id, username, likes_count, caption, time_ago, image_url, user_liked}) => {
  const [liked, setLiked] = useState(user_liked);
  const [likes, setLikes] = useState(likes_count);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async (postId) => {
    const res = await like_post(postId);
    if (!res.success) return;
  
    setLiked(res.isliked);
    setLikes(prev => prev + (res.isliked ? 1 : -1));
  };

  return (
    <div className="flex flex-row">
      <div className="bg-black rounded-md shadow-md mb-6 p-4 w-full max-w-xl border-b-1 border-gray-500">
        
        {/* Header */}
        <div className="flex items-center mb-3">
          <img src={`https://robohash.org/${username}.png`} alt="Profile" className="w-10 h-5 rounded-full mr-3" />
          <span className="font-semibold text-white">{username}</span>
        </div>

        {/* Image */}
        <img src={image_url || `https://picsum.photos/600/600?random=${id}`} alt="Post" 
          className="w-full rounded-md mb-3 border-1 border-gray-500" />

        {/* Actions */}
        <PostActions 
          liked={liked}
          handleLike={()=>handleLike(id)}
          handleComments={() => {setShowComments(prev => !prev)}}
        />

        {/* Likes */}
        <div className="font-semibold text-sm mb-1 text-white">{likes} likes</div>

        {/* Caption */}
        <div className="text-sm text-white">
          <span className="font-semibold">{username}</span> {caption}
        </div>

        {/* Time */}
        <div className="text-xs text-white mt-1">{time_ago}</div>

        {/* Comments Section */}
        {showComments && <Comments username={username}/>}
      </div>
    </div>
  );
};

export default Post;
