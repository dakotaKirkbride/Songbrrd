
// reference: https://next-auth.js.org/configuration/pages

import { getProviders, signIn } from "next-auth/react";
import { Button, Title, Container, Group, Paper, Box } from '@mantine/core';

export default function SignIn({ providers }) {

  return (
    <Box sx={(theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 300,
    })}>
      <Paper
        padding='xl'
        radius='lg'
        shadow='xl'
        sx={{
          width: 600,
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Group direction="column">
          <Container>
            <Title>Sign In</Title>
          </Container>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button onClick={() => signIn(provider.id, {callbackUrl: window.location.search.split("=")[1]})}>
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </Group>
      </Paper>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}