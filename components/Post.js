import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Moment from 'react-moment';
const Post = ({ post }) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* Image */}
      <img className="w-11 h-11 rounded-full object-cover mr-4" src={post.data().userImage} alt={post.data().name + '-image'} />
      {/* Right side */}
      <div>
        {/* Header */}
        <div className="flex items-center">
          {/* User info */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>
            <span className="text-sm sm:text-[15px]">@{post.data().username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post.data().timestamps.toDate()}</Moment>
            </span>
          </div>
          {/* Dots Icon */}
          <EllipsisHorizontalIcon className="h-10 hover-effect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* Texts */}
        <p className="text-gray-800 text-[15] sm:text-[16px] mb-2">{post.data().text}</p>
        {/* Post Image */}
        <img className="rounded-2xl mr-2 w-full" src={post?.data().image} alt={post.data().text} />
        {/* ICONS */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hover-effect p-2 hover:text-blue-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hover-effect p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="h-9 w-9 hover-effect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 hover-effect p-2 hover:text-blue-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hover-effect p-2 hover:text-blue-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};
export default Post;
