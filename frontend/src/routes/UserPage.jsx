import React, { useEffect, useState } from "react";
import { get_user } from "../services/user";
import { get_user_posts } from "../services/post";

const UserPage = () => {
  const [currUser, setCurrUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const [user_response, post_response] = await Promise.all([
        get_user(),
        get_user_posts(),
      ]);
      setCurrUser(user_response?.data);
      setUserPosts(post_response?.data);
    };
    fetchContent();
  }, []);

  if (!currUser || !userPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-15 py-10 md:ml-20 overflow-x-hidden">
      {/* Profile Section */}
      <div className="flex items-center mx-25 p-10 ">
        <img
          src={currUser.image || `https://robohash.org/${currUser.id}.png`}
          alt="Profile"
          className="w-50 h-50 rounded-full mr-50 border-2 border-white/30 bg-center"
        />
        <div>
          <h1 className="text-3xl p-3">{currUser.username}</h1>
          <div className="flex space-x-6 mt-2 p-3">
            <span className="text-xl"><span className="font-bold text-xl">{currUser.post_count}</span> posts</span>
            <span className="text-xl"><span className="font-bold text-xl">{currUser.followers}</span> followers</span>
            <span className="text-xl"><span className="font-bold text-xl">{currUser.followings}</span> following</span>
          </div>
          <p className="text-s my4 p-3">{currUser.bio}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="flex text-xl mb-4 justify-center p-3">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
          {userPosts.map((post, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={post.image || "https://picsum.photos/300"}
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
    </div>
  );
};
export default UserPage;
