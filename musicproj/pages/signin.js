import { useSession, signIn, signOut } from "next-auth/react"
import { Button, Text } from '@mantine/core';

export default function signInButton() {
  const { data: session } = useSession()
  if(session) {
    return <>
      <Text>Hi, {session.user.name.split(" ")[0]}</Text>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  }
  return <>
    <Button onClick={() => signIn()}>Log In / Sign Up</Button>
  </>
}