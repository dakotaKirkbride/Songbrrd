
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppShell, Group, Slider, Container, Space } from '@mantine/core';
import TrackList from '../../components/trackList';
import { Button, Link } from '@nextui-org/react';
import Header from '../../components/header';
import spotifyApi from '../../library/spotify';

export default function Album({ albumObj, albumId, albumName, artistName, albumImg }) {

  console.log(albumObj);

  const [sliderVal, setSliderVal] = useState(0);

  const callPostAlbum = async () => {

    albumObj["rating"] = sliderVal;

    const data = await fetch(
      '/api/albums/postAlbum',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumObj)
      }
    )
  }

  return (<>
    <Header />
    <Link href='/'>
      <Button size='sm'>Home</Button>
    </Link>
    <Group direction='column' position='center' spacing='5'>
      <h1>{albumName}</h1>
      <h2>An album by {artistName}</h2>
      <img src={albumImg} />
      <Space h={40} />
      <Container size={400}>
        <Slider min={0} max={10} step={0.5} value={sliderVal} onChange={setSliderVal} />
        <Button onClick={callPostAlbum} style={{ marginTop: 20 }}>Rate Album</Button>
      </Container>
    </Group>
    <TrackList tracks={albumObj.tracks.items} />
  </>
  );
}

let album = [];

export async function getServerSideProps(albumContext) {

  const albumId = albumContext.query.album;

  await spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getAlbum(`${albumId}`)
    })
    .then(function (data) {
      album = data.body;
      console.log(album);
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  return {
    props: {
      albumObj: album,
      albumId,
      albumName: album.name,
      artistName: album.artists[0].name,
      albumImg: album.images[1].url,
    }
  }

}