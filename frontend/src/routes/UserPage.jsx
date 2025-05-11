import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { get_user_posts } from "../services/post";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditProfileModal from '../modals/EditProfileModal';
import DeletePostModal from "../modals/DeletePostModal";

const UserPage = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await get_user_posts();
      if (result.success) setUserPosts(result.data);
    }
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-15 py-10 md:ml-20 overflow-x-hidden">
      {/* Profile Section */}
      <div className="flex items-center mx-25 p-10">
        <img
          src={user.image_url || `https://robohash.org/${user.username}.png`}
          alt="Profile"
          className="w-50 h-50 rounded-full mr-50 border-2 border-white/30 bg-center"
        />
        <div>
          <div className="flex space-x-4">
            <h1 className="text-3xl">{user.username}</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-3xl"
              onClick={() => setShowEditProfileModal(true)}
            >
              Edit Profile
            </button>

            <EditProfileModal 
              isOpen={showEditProfileModal} 
              onClose={() => setShowEditProfileModal(false)} 
            />
          </div>

          <div className="flex space-x-6 mt-2">
            <span className="text-xl">
              <span className="font-bold text-xl">{user.posts_count}</span> posts
            </span>
            <span>
              <span className="font-bold text-xl">{user.followers_count}</span> followers
            </span>
            <span>
              <span className="font-bold text-xl">{user.followings_count}</span> following
            </span>
          </div>
          <p className="text-s my4 p-3">{user.bio}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-700 pt-6 realtive">
        <h2 className="text-xl text-center mb-4">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden relative">
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setPostToDelete(prev => prev ? null: post.id)}
              >
                <BsThreeDotsVertical size={25}/>
              </button>

              {postToDelete === post.id && (
                <div
                  className="absolute top-8 right-2 bg-gray-700 text-white p-2 rounded shadow-md z-10"
                >
                  <button
                    onClick={() => setShowDeletePostModal(true)}
                    className="text-sm hover:text-red-500"
                  >
                    Delete Post
                  </button>
                </div>
              )}

              <img
                src={post.image || `https://picsum.photos/300?random=${post.id}`}
                alt={`post-${post.id}`}
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

      {/* Delete Confirmation Modal */}
      {showDeletePostModal && <DeletePostModal 
        id={postToDelete}
        onDeleteSuccess={() => {
          setUserPosts((prev) => prev.filter((post) => post.id !== postToDelete))
        }}
        onClose={()=>{
          setShowDeletePostModal(false);
          setPostToDelete(null);
        }}
      />}
    </div>
  );
};

export default UserPage;
