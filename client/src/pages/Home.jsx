import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URL;
  console.log(backend);
  console.log(`${backend}/api/post/getPosts`);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${backend}/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          This is a blog site prepared by bhaskar mishra , you can share your own thoughts in the form of posts , interact with posts of other people  , like and comment if you want to . Every post is being monitored by the <span>Admin</span> of the website,any hateful or unethical comment or post will be deleted without permission.<br></br> Feel free to use this platform to express yourself.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline '
        >
          View all posts
        </Link>
      </div>
    

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
