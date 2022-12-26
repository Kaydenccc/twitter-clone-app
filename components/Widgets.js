import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import News from './News';

const Widgets = ({ news, followers }) => {
  const [articleNum, setArticleNum] = useState(2);
  const [usersNum, setUsersNum] = useState(3);
  return (
    <div className="xl:w-[350px] sm:w-[300px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%]  sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 relative rounded-full ">
          <MagnifyingGlassIcon className="h-5 z-50 text-gray-500" />
          <input className="absolute inset-0 !border-gray-300 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" type="text" placeholder="Search Twitter" />
        </div>
      </div>
      <div className="text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%] ">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {news?.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={() => setArticleNum(articleNum + 2)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          Show more
        </button>
      </div>
      <div className="text-gray-700 sticky top-16 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followers?.slice(0, usersNum).map((follower) => (
          <div key={follower.login.uuid} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
            <img src={follower.picture.thumbnail} width={40} className="rounded-full object-cover" alt={follower.login.username} />
            <div className="truncate ml-4 leading-5">
              <h4 className="font-bold hover:underline text-[14px] truncate">{follower.login.username}</h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {follower.name.first} {follower.name.last}
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5">Follow</button>
          </div>
        ))}
        <button onClick={() => setUsersNum(usersNum + 5)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          Show more
        </button>
      </div>
    </div>
  );
};
export default Widgets;
