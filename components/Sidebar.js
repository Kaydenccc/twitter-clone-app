import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/20/solid';
import { HashtagIcon, BellIcon, InboxIcon, EllipsisHorizontalIcon, EllipsisHorizontalCircleIcon, BookmarkIcon, UserIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import SidebarMenuItem from './SidebarMenuIcon';
import { useSession, signIn, signOut } from 'next-auth/react';
const Sidebar = () => {
  const { data } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter logo */}
      <div className="hover-effect p-0 hover:bg-blue-100 xl:px-1">
        <Image width={50} height={50} src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="logo twitter" />
      </div>
      {/* Menu  */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {data && (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>
      {/* Button */}
      {data ? (
        <button className="bg-blue-400 text-white rounded-full font-bold hidden xl:inline hover:brightness-95 text-lg shadow-md w-56 h-12">Tweet</button>
      ) : (
        <button onClick={signIn} className="bg-blue-400 text-white rounded-full font-bold hidden xl:inline hover:brightness-95 text-lg shadow-md w-56 h-12">
          Sign in
        </button>
      )}

      {/* Mini profile */}
      {data && (
        <div className="hover-effect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
          <img onClick={signOut} className="h-10 w-10 rounded-full object-cover xl:mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU" alt="dummy profile picture" />
          <div className="leading-5 hidden xl:inline">
            <h4 className="font-bold">{data.user.name}</h4>
            <p className="text-gray-500">@{data.user.username}</p>
          </div>
          <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};
export default Sidebar;
