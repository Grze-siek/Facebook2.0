import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ReactTimeago from 'react-timeago';

function MessageComponent({ message }) {
  const session = useSession();
  const isUser = session.data?.user.email == message.email;
  if (typeof message.message != 'string') return;
  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={session.data?.user.image}
          alt="Profile Picture"
        />
      </div>
      <div className={`${isUser ? 'mr-2' : 'ml-2'}`}>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-gray-300 px-2 italic text-[0.65rem] ${
              isUser && 'text-right'
            }`}
          >
            <ReactTimeago date={new Date(message.created_at)} minPeriod={60} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
