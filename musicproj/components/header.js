import { Header, Text, Group, Button, Menu, Container, Box, Drawer, Space } from '@mantine/core';
import { theme } from '@nextui-org/react';
import React, { useState } from 'react';
import { Link } from '@nextui-org/react';
import SearchBar from './searchbar';
import SignInButton from './signInButton';
import AlbumIcon from '@mui/icons-material/Album';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SettingsIcon from '@mui/icons-material/Settings'

import { useSession, signIn, signOut } from "next-auth/react"

export default function PageHeader() {
  const [navOpened, setNavOpened] = useState(false);
  const { data: session } = useSession()

  return (
    <>
      <Header height={60} padding='xs'>
        <Container size={1200}>
          <Group position="center" noWrap={true} style={{ justifyContent: 'space-between' }}>
            <Link href='/'>
              <Text variant="gradient" gradient={{ from: 'grape', to: 'violet' }} size='xl' weight={700}>Songbrrd</Text>
            </Link>
            <SearchBar />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
              <Menu control={<Button variant="subtle" radius="xl">Music</Button>}>
                <Menu.Item icon={<AlbumIcon htmlColor='orange' />}>Top Albums</Menu.Item>
                <Menu.Item icon={<StarIcon htmlColor='gold' />} >Top Artists</Menu.Item>
                <Menu.Item icon={<LocalFireDepartmentIcon htmlColor='red' />} >New Releases</Menu.Item>
              </Menu>
              <Space w="md"/>
              <Menu control={<Button variant="subtle" radius="xl">...</Button>}>
                <Menu.Item icon={<SettingsIcon htmlColor='grey' />}>Settings</Menu.Item>
                <Menu.Item sx={{ display: 'flex', justifyContent: 'fill' }}>
                  {session ? (
                    <Button variant="gradient" gradient={{ from: 'grape', to: 'violet' }} sx={{ width: 160 }} onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
                  ) : (
                    <Button variant="gradient" gradient={{ from: 'grape', to: 'violet' }} onClick={() => signIn()} sx={{ width: 160 }}>Log In / Sign Up</Button>)}
                </Menu.Item>
              </Menu>
            </Box>
            <SignInButton />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={navOpened}
        onClose={() => setNavOpened(false)}
        position="right"
        size="lg">
      </Drawer>
    </>
  )
}
