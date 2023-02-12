import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Login from './login';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Facebook</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
