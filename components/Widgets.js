import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import News from './News';

const Widgets = ({ news }) => {
  const [articleNum, setArticleNum] = useState(2);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 relative rounded-full ">
          <MagnifyingGlassIcon className="h-5 z-50 text-gray-500" />
          <input className="absolute inset-0 !border-gray-300 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" type="text" placeholder="Search Twitter" />
        </div>
      </div>
      <div className="text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {news?.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={() => setArticleNum(articleNum + 2)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          Show more
        </button>
      </div>
    </div>
  );
};
export default Widgets;
