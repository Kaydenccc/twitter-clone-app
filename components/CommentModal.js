import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';
import Modal from 'react-modal';
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
const CommentModal = () => {
  const router = useRouter();
  const { data } = useSession();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});

  useEffect(() => {
    onSnapshot(doc(db, 'posts', postId), (snapshot) => setPost(snapshot));
  }, [postId, db]);

  const sendComment = async () => {
    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        comments: input,
        name: data?.user?.name,
        username: data?.user?.username,
        image: data?.user?.image,
        timestamps: serverTimestamp(),
      });
      setIsOpen(false);
      setInput('');
      router.push(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Modal Atom</h1>
      {isOpen && (
        <Modal
          onRequestClose={() => setIsOpen(false)}
          isOpen={isOpen}
          className="max-w-lg focus:outline-2 focus:outline-gray-300  border-2 border-gray-200  w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white  rounded-lg shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div onClick={() => setIsOpen(false)} className="hover-effect w-9 h-9 p-0 font-semibold flex items-center justify-center">
                <XMarkIcon className="h-[22px] text-gray-700" />
              </div>
            </div>
            <div className="flex p-3 cursor-pointer border-gray-200 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
              <img className="w-11 h-11 rounded-full object-cover mr-4" src={post?.data()?.userImage} alt={post?.data()?.name + '-image'} />
              {/* Header */}
              <div className="flex items-center">
                {/* User info */}
                <div className="flex space-x-1 items-center whitespace-nowrap">
                  <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
                  <span className="text-sm sm:text-[15px]">@{post.data()?.username} - </span>
                  <span className="text-sm sm:text-[15px] hover:underline">
                    <Moment fromNow>{post?.data()?.timestamps?.toDate()}</Moment>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-[4.5rem] mb-2">{post?.data()?.text}</p>
            <div className="flex p-3 space-x-3">
              <img className="h-11 w-11 rounded-full object-cover cursor-pointer hover:brightness-95" src={data?.user?.image} alt="avatar" />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px]" rows="2" placeholder="Tweet your reply"></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex items-center ">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 w-10 hover-effect p-2 text-sky-400 hover:bg-sky-100" />
                      {/* <input onChange={addImagePost} type="file" name="image" id="image" className="hidden" ref={filePickerRef} /> */}
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hover-effect p-2 text-sky-400 hover:bg-sky-100" />
                  </div>
                  <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 disabled:opacity-50 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default CommentModal;
