import { getProviders, signIn } from 'next-auth/react';
const Signin = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        className="object-cover hidden md:w-44 md:h-80 md:inline-flex"
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image with a phone"
      />
      <div className="">
        {Object.values(providers).map((provide, i) => (
          <div key={provide.id} className="flex items-center flex-col">
            <img className="w-36 object-cover " src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter" />
            <p className="text-center font-medium text-sm italic mb-10">This app is created for learning purposes</p>
            <button onClick={() => signIn(provide.id, { callbackUrl: '/' })} className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">
              Sign in with {provide.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Signin;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
