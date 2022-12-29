import { SparklesIcon } from '@heroicons/react/24/outline';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';
import { AnimatePresence, motion } from 'framer-motion';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts'), orderBy('timestamps', 'desc')), (snapshot) => setPosts(snapshot.docs));
  }, []);

  return (
    <div className="xl:ml-[370px] border-x border-gray-200 xl:min-w-[576px] flex-grow max-w-xl sm:ml-[73px]">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hover-effect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5 rotate-180" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <Post post={post} key={post.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export default Feed;
