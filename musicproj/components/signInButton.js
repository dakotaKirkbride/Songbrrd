import { useSession, signIn, signOut } from "next-auth/react"
import { Button, Text, Avatar, Box, Space } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function SignInButton() {
  const { data: session } = useSession()
  if(session) {
    return <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      <Text>Hi, {session.user.name.split(" ")[0]}</Text>
      <Space w='md'/>
      <Link href={`/profile/${session.user.email}`}>
        <Avatar radius='xl' src={session.user.image} />
      </Link>
      {/* <Button variant="gradient" gradient={{ from: 'grape', to: 'violet' }} onClick={() => signOut()}>Sign out</Button> */}
    </Box>
  }
  return <>
    <Button variant="gradient" gradient={{ from: 'grape', to: 'violet' }} onClick={() => signIn()}>Log In / Sign Up</Button>
  </>
}