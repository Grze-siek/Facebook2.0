import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Head from 'next/head';

function Login() {
  return (
    <>
      <Head>
        <title>Facebook | LogIn</title>
      </Head>
      <div className="grid place-items-center space-y-10 pt-10">
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/800px-Facebook_f_logo_%282021%29.svg.png?20210818083032"
          height={200}
          width={200}
          objectFit="contain"
        />
        <h1
          onClick={signIn}
          className="p-5 bg-blue-500 rounded-full text-center text-white cursor-pointer"
        >
          Login with Facebook
        </h1>
      </div>
    </>
  );
}

export default Login;
