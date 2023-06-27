
import { PrismaClient } from "@prisma/client";
import { Title, TextInput, Button, Box, Container, Paper, Group, Space } from '@mantine/core';
import { Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useDebounce } from '../../hooks/debounceHook';

const prisma = new PrismaClient()

export default function NewUser({ usernames }) {

  const [ searchVal, setSearchVal ] = useState("");
  const [ buttonState, setButtonState ] = useState(true);
  const [ textState, setTextState ] = useState(false);
  const { data: session } = useSession();

  const changeHandler = event => {
    event.preventDefault();
    setSearchVal(event.target.value);
  }
  const updateUsername = async () => {
    const userEmail = session.user.email;

    const data = await fetch(`/api/users/updateUsername?email=${userEmail}&username=${searchVal}`).then(response => response.json());
  }
  const checkUsername = () => {
    if (usernames.includes(searchVal)) {
      setTextState(true);
      setButtonState(true);
    } else {
      setButtonState(false);
      setTextState(false);
    }
  }
  useDebounce(searchVal, 50, checkUsername);
  
  return (
    <Box sx={(theme) => ({display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 300, })}>
      <Paper padding='xl' radius='lg' shadow='xl' sx={{width: 600, height: 600,display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Group direction="column" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Container>
            <Title>Create Your Account</Title>
          </Container>
          <Space h='lg'/>
          <TextInput error={textState} label="Enter a username" placeholder="Your username" required value={searchVal} onChange={changeHandler} />
          <Link href='/'>
            <Button disabled={buttonState} onClick={() => updateUsername()}>Create Account</Button>
          </Link>
        </Group>
      </Paper>
    </Box>
  )
}

export async function getServerSideProps() {

  const users = await prisma.user.findMany()

  const usernames = [];
  for (const user of users) {
    usernames.push(user.username)
  }

  return {
    props: {
      usernames: usernames
    }
  }

}