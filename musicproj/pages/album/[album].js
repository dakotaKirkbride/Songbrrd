
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppShell, Header, Group, Button, Slider, Container, Space } from '@mantine/core';
// import addAlbum from '../../library/addAlbum';

export default function Album( { albumObj, albumId, albumName, artistName, albumImg} ) {

  // console.log(albumId);

  const [sliderVal, setSliderVal] = useState(0);

  const callPostAlbum = async () => {

    albumObj["rating"] = sliderVal;
    // console.log("HEY THERE THIS IS THE PRINT STATEMENT: " +albumObj);

    const data = await fetch(
      '/api/albums/postAlbum',
      {method: 'POST', 
      headers: {
        'Content-Type': 'application/json'}, 
      body: JSON.stringify(albumObj)}
      )
  }

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
        <Space h={40}/>
        <Container size={400}>
          <Slider min={0} max={10} step={0.5} value={sliderVal} onChange={setSliderVal}/>
          <Button onClick={callPostAlbum} style={{ marginTop: 20}}>Rate Album</Button>
        </Container>

      </Group>

    </AppShell>
  );

}

export async function getServerSideProps( albumContext ) {

  const albumId = albumContext.query.album;
  const data = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, 
  {  
    headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_OAUTH_TOKEN}`
    }
  }).then(response => response.json());

  return { props: {
    albumObj: data,
    albumId,
    albumName: data.name,
    artistName: data.artists[0].name,
    albumImg: data.images[1].url,
  } }
}