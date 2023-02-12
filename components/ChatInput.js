import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import toast, { Toaster } from 'react-hot-toast';

function ChatInput() {
  const [input, setInput] = useState('');
  const session = useSession();
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  const addMessage = async (e) => {
    e.preventDefault();

    if (!input || !session) return;
    const messageToSend = input;
    setInput('');
    const id = uuid();

    const message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session.data?.user.name,
      profile_picture: session.data?.user.image,
      email: session.data?.user.email,
    };

    const uploadMessageToFirebase = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      // const data = db
      //   .collection('messages')
      //   .doc(id)
      //   .set(message)
      //   .then(() => {
      //     console.log('Document successfully written!');
      //   })
      //   .catch((error) => {
      //     console.error('Error writing document: ', error);
      //   });
      const data = await res.json();
      console.log('Message added >>>', data);
      return [data, ...messages];
    };

    try {
      await mutate(uploadMessageToFirebase(), {
        optimisticData: [message, ...messages],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success('Message added successfully');
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      toast.error('Failed to add message.');
    }
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 bg-white space-x-2 border-t border-gray-100"
    >
      <Toaster toastOptions={{ position: 'bottom-center' }} />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
