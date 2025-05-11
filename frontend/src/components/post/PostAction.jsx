import React from 'react';
import { BsFillHeartFill, BsFillChatFill, BsBookmarkFill, BsFillCursorFill } from 'react-icons/bs';

const PostActions = ({ liked, handleLike, handleComments }) => {
  return (
    <>
      <div className="flex space-x-4 text-2xl mb-2 text-white">
        <button 
          className={`my-4 ${liked ? 'text-red-600' : 'text-white'} hover:text-red-800`}
          onClick={handleLike}
        >
          <BsFillHeartFill />
        </button>
        <button className="text-white my-4 hover:text-gray-400" onClick={handleComments}>
          <BsFillChatFill />
        </button>
        <button className="text-white my-4 hover:text-gray-400"><BsFillCursorFill /></button>
        <button className="text-white my-4 hover:text-gray-400 ml-auto"><BsBookmarkFill /></button>
      </div>
    </>
  );
};

export default PostActions;
