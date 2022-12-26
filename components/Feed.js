import { SparklesIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import Post from './Post';

const Feed = () => {
  const posts = [
    {
      id: 1,
      name: 'Kayden',
      username: 'kaydencc',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU',
      postImg: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      text: 'What a beautiful view.',
      timestamps: ' 2 hours ago',
    },
    {
      id: 2,
      name: 'Kayden',
      username: 'kaydencc',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU',
      postImg: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      text: 'What a beautiful view.',
      timestamps: ' 2 days ago',
    },
  ];
  return (
    <div className="xl:ml-[370px] border-x border-gray-200 xl:min-w-[576px] flex-grow max-w-xl sm:ml-[73px]">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hover-effect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5 rotate-180" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Feed;
