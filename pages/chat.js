import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import MessageList from '../components/MessageList';
import MessengerLayout from '../components/MessengerLayout';
import { getSession } from 'next-auth/react';
import Login from '../pages/login';

function chat({ session }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  if (!session) {
    return <Login />;
  }

  async function fetchData() {
    const data = await fetch(
      `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
    )
      .then((res) => res.json())
      .then((data) => {
        setMessages((messages = [...data.messages]));
        console.log(data.messages);
      });
    setLoading(false);
    console.log('From chat :', messages);
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Messenger</title>
      </Head>
      <MessengerLayout>
        <MessageList initialMessages={messages} />
      </MessengerLayout>
    </>
  );
}

export default chat;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
