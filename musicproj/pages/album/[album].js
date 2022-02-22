
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppShell, Header, Group, Button } from '@mantine/core';

const Album = ( { albumId, albumName, artistName, albumImg} ) => {

  console.log(albumId);

  return (
    <AppShell
      padding="md"
      // navbar={<Navbar width={{ base: 300 }} height={500} padding="xs">{/* Navbar content */}</Navbar>}
      header={<Header height={60} padding="sm">{/* Header content */}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>
      <Group direction='column' position='center' spacing='5'>
        <h1>{albumName}</h1>
        <h2>An album by {artistName}</h2>
        <img src={albumImg}/>
        <Button onClick={() => console.log('You liked this album')} style={{ marginTop: 20}}>Like</Button>
      </Group>
    </AppShell>
  );

}

export async function getServerSideProps( albumContext ) {
  console.log(albumContext);
  const albumId = albumContext.query.album;
  const data = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, 
  {  
    headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_OAUTH_TOKEN}`
    }
  }).then(response => response.json());
  console.log(data);
  return { props: {
    albumId,
    albumName: data.name,
    artistName: data.artists[0].name,
    albumImg: data.images[1].url,
  } }
}


export default Album