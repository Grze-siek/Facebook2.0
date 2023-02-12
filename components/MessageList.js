import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetchMessages';
import MessageComponent from './MessageComponent';
import { clientPusher } from '../pusher';

function MessageList({ initialMessages }) {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data) => {
      // if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        console.log('After validation: ', messages);
        await mutate(fetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 mb-32 pt-8 max-w-2xl xl:max-w-4xl mx-auto">
      {messages || initialMessages
        ? (messages || initialMessages)?.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))
        : []}
    </div>
  );
}

export default MessageList;
