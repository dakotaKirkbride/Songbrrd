
import { getSession } from 'next-auth/react';
import { Image } from '@mantine/core';
import Header from '../../components/header';

export default function profile( { user } ) {
  return (
    <div>
      <Header />
      <h1>Hello, {user.name.split(" ")[0]} </h1>
      <Image width={200} src={user.image}/>
    </div>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession(context);

  if (!session) {
    console.log("NO SESSION");
  }
  console.log(session.user.email);
  return {
    props: {
      user: session.user,
    },
  };

}