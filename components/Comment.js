import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconLike } from '@heroicons/react/24/solid';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { db, storage } from '../firebase';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';
import { useRouter } from 'next/router';
const Comment = ({ comments, commentId, originalPostId }) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { data } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  // space
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => setLikes(snapshot.docs));
  }, [db, commentId, originalPostId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === data?.user.id) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (data) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', data?.user.id));
      } else {
        await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', data?.user.id), {
          username: data.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId));
    }
  };
  return (
    <div className="flex p-3 pl-12 md:pl-20 w-full cursor-pointer border-b border-gray-200">
      {/* Image */}
      <img className="w-11 h-11 rounded-full object-cover mr-4" src={comments?.image} alt={comments?.name + '-image'} />
      {/* Right side */}
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center w-full">
          {/* User info */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comments?.name}</h4>
            <span className="text-[13px] sm:text-[15px] hidden sm:inline-block">@{comments?.username}</span>
            <span className="text-[13px] sm:text-[15px] hover:underline">
              - <Moment fromNow>{comments?.timestamps?.toDate()}</Moment>
            </span>
          </div>
          {/* Dots Icon */}
          <EllipsisHorizontalIcon className="h-10 ml-auto hover-effect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* Texts */}
        <p className="text-gray-800 text-[15] sm:text-[16px] mb-2">{comments?.comments}</p>
        {/* ICONS */}
        <div className="flex justify-between text-gray-500 p-2">
          {comments?.userId === data?.user?.id && <TrashIcon onClick={deletePost} className="h-9 w-9 hover-effect p-2 hover:text-red-600 hover:bg-red-100" />}

          <div className="flex items-center justify-center">
            {hasLiked ? (
              <HeartIconLike className="h-9 w-9 hover-effect p-2 text-red-500 hover:text-red-600 hover:bg-red-100" onClick={likePost} />
            ) : (
              <HeartIcon onClick={likePost} className="h-9 w-9 hover-effect p-2 hover:text-red-600 hover:bg-red-100" />
            )}
            {likes.length > 0 && <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>{likes.length}</span>}
          </div>

          <ShareIcon className="h-9 w-9 hover-effect p-2 hover:text-blue-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hover-effect p-2 hover:text-blue-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};
export default Comment;
