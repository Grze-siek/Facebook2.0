import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Router from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';

function ChatHeader() {
  const session = useSession();
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center py-4 pl-4 pr-8 shadow-sm">
      <div className="flex items-center space-x-2">
        <Image
          className="cursor-pointer"
          onClick={() => Router.push('/')}
          height={40}
          width={160}
          layout="fixed"
          src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg"
        />
        <div className="plainIcon text-gray-500 bg-gray-100">
          <SearchIcon className="h-6" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          onClick={signOut}
          className="cursor-pointer rounded-full"
          src={session.data?.user.image}
          width={50}
          height={50}
          layout="fixed"
          alt="Profile Picture"
        />
        <div>
          <p className="text-blue-400">Logged in as:</p>
          <p className="whitespace-nowrap font-bold text-lg">
            {session.data?.user.name}
          </p>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;
