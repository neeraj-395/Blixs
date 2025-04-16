import React from 'react';
import { BsFillHeartFill, BsFillChatFill, BsBookmarkFill, BsFillCursorFill } from 'react-icons/bs';

const Post = ({username, userImg, postImg, likes, caption, timestamp}) => {
  return (
    <>
    <div className="flex flex-row">
      <div className="bg-black rounded-md shadow-md mb-6 p-4 w-full max-w-xl border-b-1 border-gray-500">
        {/* Header */}
        <div className="flex items-center mb-3">
          <img src={userImg} alt="Profile" className="w-10 h-5 rounded-full mr-3" />
          <span className="font-semibold text-white">{username}</span>
        </div>

        {/* Image */}
        <img src={postImg} alt="Post" className="w-full rounded-md mb-3 border-1 border-gray-500" />

        {/* Actions */}
        <div className="flex space-x-4 text-2xl mb-2 text-white">
          <button className="text-white my-4 hover:text-red-800" type="submit"><BsFillHeartFill /></button>
          <button className="text-white my-4 hover:text-gray-400" type="submit"><BsFillChatFill /></button>
          <button className="text-white my-4 hover:text-gray-400" type="submit"><BsFillCursorFill /></button>
          <button className="text-white my-4 hover:text-gray-400 ml-auto" type="submit"><BsBookmarkFill /></button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1 text-white">{likes} likes</div>

        {/* Caption */}
        <div className="text-sm text-white">
          <span className="font-semibold">{username}</span> {caption}
        </div>

        {/* Time */}
        <div className="text-xs text-white mt-1">{timestamp}</div>
      </div>
    </div>
    </>
  );
};

export default Post;
