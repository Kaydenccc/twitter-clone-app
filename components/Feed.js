import { SparklesIcon } from '@heroicons/react/24/outline';

const Feed = () => {
  return (
    <div className="xl:ml-[370px] border-x border-gray-200 xl:min-w-[576px] flex-grow max-w-xl sm:ml-[73px]">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hover-effect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5 rotate-180" />
        </div>
      </div>
    </div>
  );
};
export default Feed;
