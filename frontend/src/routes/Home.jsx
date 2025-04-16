import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { get_posts } from '../services/posting';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get_posts();
        console.log("Fetched Posts: ", response);
        if (response && Array.isArray(response)) {
          setPosts(response);
        } else {
          setError('Invalid data format');
        }
      } catch (err) {
        setError('Error fetching posts: ' + err.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black p-4 flex flex-col items-center w-full md:ml-0">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post key={index} {...post} />
        ))
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default Home;
