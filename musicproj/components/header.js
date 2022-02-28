
import { Header, Text, Group, Button, Menu, Container, Avatar } from '@mantine/core';
import { theme } from '@nextui-org/react';
import { useState } from 'react';
import { Link } from '@nextui-org/react';
import SearchBar from './searchbar';
import SignInButton from '../pages/signIn';
import AlbumIcon from '@mui/icons-material/Album';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function header() {

  const [navOpened, setNavOpened] = useState(false);

  return (
    <>
      <Header height={60} padding='xs'>
        <Container size={1200}>
        <Group position="center" noWrap={true} style= {{ justifyContent: 'space-between'}}>
          <Text size='lg'>Songbrrd</Text>
          <SearchBar />
          <Menu control={<Button variant="subtle" radius="xl">Music</Button>}>
            <Menu.Item icon={<AlbumIcon htmlColor='orange'/>}>Top Albums</Menu.Item>
            <Menu.Item icon={<StarIcon htmlColor='gold'/>} >Top Artists</Menu.Item>
            <Menu.Item icon={<LocalFireDepartmentIcon htmlColor='red'/>} >New Releases</Menu.Item>
          </Menu>

          <SignInButton/>
          {/* <Link href=''>
            <Button>Log In / Sign Up</Button>
          </Link> */}

          {/* <MediaQuery largerThan="xl"
            styles={{ display: 'none' }}>
            <Burger hiddenBreakpoint="xl" opened={navOpened} onClick={() => setNavOpened((o) => !o)} />
          </MediaQuery> */}
        </Group>
        </Container>
        
      </Header>












      {/* <Navbar fixed position={{ top: 60, right: 0 }} width={{ base: 300 }} height={800} hidden={!navOpened} hiddenBreakpoint="2000" padding="md" style={{ backgroundColor: theme.colors.gray100}}>
        <Group direction='column' position='center'>
        <Navbar.Section><Link href='/profile/[profile]'>Profile</Link></Navbar.Section>
          <Navbar.Section><Link href='/'>Home</Link></Navbar.Section>
          <Navbar.Section><Link href='/genres'>Genres</Link></Navbar.Section>
          <Navbar.Section><Link href='/signin'>Login</Link></Navbar.Section>
        </Group>

      </Navbar> */}
    </>
  )
}