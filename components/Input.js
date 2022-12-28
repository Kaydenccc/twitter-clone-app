import { XMarkIcon } from '@heroicons/react/20/solid';
import { PhotoIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { useSession, signOut } from 'next-auth/react';
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';

const Input = () => {
  const { data } = useSession();
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendPost = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        text: input,
        userImage: data.user.image,
        timestamps: serverTimestamp(),
      });
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            image: downloadURL,
          });
        });
      }
      setInput('');
      setSelectedFile(null);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const addImagePost = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    <>
      {data && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img onClick={signOut} className="h-11 w-11 rounded-full object-cover cursor-pointer hover:brightness-95" src={data?.user?.image} alt="avatar" />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px]" rows="2" placeholder="What's happening?"></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XMarkIcon className="h-6 z-50 top-[-5px] left-[-5px] text-white absolute cursor-pointer hover:brightness-95 shadow-sm shadow-red rounded-full bg-red-300" onClick={() => setSelectedFile(null)} />
                <img src={selectedFile} alt="preview" className={`${isLoading && 'animate-pulse'}`} />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!isLoading && (
                <>
                  <div className="flex items-center ">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 w-10 hover-effect p-2 text-sky-400 hover:bg-sky-100" />
                      <input onChange={addImagePost} type="file" name="image" id="image" className="hidden" ref={filePickerRef} />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hover-effect p-2 text-sky-400 hover:bg-sky-100" />
                  </div>
                  <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 disabled:opacity-50 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Input;
