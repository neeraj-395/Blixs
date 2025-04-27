import React, { useEffect, useState, useRef } from "react";
import { get_user } from "../services/user";
import { get_user_posts, delete_post } from "../services/post";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserPage = () => {
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const dropdownRef = useRef(null); 

  useEffect(() => {
    const fetchContent = async () => {
      const [user_res, post_res] = await Promise.all([
        get_user(),
        get_user_posts(),
      ]);
      if (user_res.success) setCurrUser(user_res.data);
      if (post_res.success) setUserPosts(post_res.data);
    };
    fetchContent();

   
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPostToDelete(null);
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (postId) => {
    const res = await delete_post(postId);
    if (res.success) {
      setUserPosts(userPosts.filter(post => post.id !== postId));
      setShowDeleteModal(false); 
    } else {
      alert("Failed to delete the post");
    }
  };

  if (!currUser || !userPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-15 py-10 md:ml-20 overflow-x-hidden">
      {/* Profile Section */}
      <div className="flex items-center mx-25 p-10">
        <img
          src={currUser.image_url || `https://robohash.org/${currUser.id}.png`}
          alt="Profile"
          className="w-50 h-50 rounded-full mr-50 border-2 border-white/30 bg-center"
        />
        <div>
          <div className="flex space-x-4">
            <h1 className="text-3xl">{currUser.username}</h1>
            <button
              type="button"
              onClick={() => navigate("/EditProfile")}
              className="px-2 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl"
            >
              Edit profile
            </button>
          </div>
          <div className="flex space-x-6 mt-2 p-3">
            <span className="text-xl">
              <span className="font-bold text-xl">{currUser.posts_count}</span> posts
            </span>
            <span className="text-xl">
              <span className="font-bold text-xl">{currUser.followers_count}</span> followers
            </span>
            <span className="text-xl">
              <span className="font-bold text-xl">{currUser.followings_count}</span> following
            </span>
          </div>
          <p className="text-s my4 p-3">{currUser.bio}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="flex text-xl mb-4 justify-center p-3">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
          {userPosts.map((post, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden relative">
             
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setPostToDelete(post.id)} 
              >
                <BsThreeDotsVertical />
              </button>

              {/* Dropdown Menu */}
              {postToDelete === post.id && (
                <div
                  ref={dropdownRef}
                  className="absolute top-8 right-2 bg-gray-700 text-white p-2 rounded"
                >
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-sm hover:text-red-500"
                  >
                    Delete Post
                  </button>
                </div>
              )}

              <img
                src={post.image || `https://picsum.photos/300?random=${post.id}`}
                alt={`post-${index}`}
                className="object-cover w-full aspect-square"
              />
              {post.caption && (
                <div className="p-3 text-sm">
                  <p>{post.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4 text-black">Are you sure you want to delete this post?</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-3"
              onClick={() => handleDelete(postToDelete)}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setShowDeleteModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
