
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Group, Slider, Container, Space, Paper, Grid, Title, Text, Image, Button, Divider } from '@mantine/core';
import TrackList from '../../components/trackList';
import { Link } from '@nextui-org/react';
import Header from '../../components/header';
import spotifyApi from '../../library/spotify';
import { useViewportSize } from '@mantine/hooks';
import { useSession, signIn, signOut } from "next-auth/react";
// import spotifyLogo from '/spotify.svg'

export default function Album({ albumObj, albumId, albumName, artistName, albumImg }) {

  const { height, width } = useViewportSize();

  const { data: session } = useSession();
  const [ratingVal, setRatingVal] = useState("N/A");
  const [avgRatingVal, setAvgRatingVal] = useState("N/A");
  const [sliderVal, setSliderVal] = useState(0);

  const callPostAlbum = async () => {

    setRatingVal(sliderVal);

    albumObj["rating"] = sliderVal;
    albumObj["userEmail"] = session.user.email;

    const data = await fetch(
      '/api/albums/postAlbumRating',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumObj)
      }
    )
  }

  useEffect(async () => {

    if (session) {
      const userEmail = session.user.email

      const data = await fetch(`/api/albums/getAlbumRating?userEmail=${userEmail}&albumId=${albumObj.id}`).then(response => response.json());

      console.log(data)

      if (data.albumRating && data.albumRating.rating !== null) {
        console.log(data.albumRating.rating)
        setRatingVal(data.albumRating.rating);
        setSliderVal(data.albumRating.rating)
        setAvgRatingVal(data.avgRating)
      }
    }
  }, session)

  return (<Box sx={(theme) => ({ 
    backgroundColor: theme.colors.gray[1],
    minHeight: height,
    paddingBottom: 200})}>
    <Header />
    <Container sx={{ maxWidth: 1200, marginTop: 100 }}>
      <Paper shadow='xl' radius='lg' padding='xl'>
        <Grid justify="center" gutter='xl'>
          <Grid.Col span={4} sx={{ display: 'flex', justifyContent: 'center' }} >
            <Image src={albumImg} radius={4} />
          </Grid.Col>
          <Grid.Col span={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }} >
            <Group direction='column'>
              <Title sx={{ fontSize: 40}}>{albumName}</Title>
              <Text color='gray' size={'xl'} weight={500}>{artistName}</Text>
              <Link href={albumObj.external_urls.spotify}>
                <Image src="/spotifyLogoGreen.png" width={25} height={25} />
              </Link>
              <Text color='gray'>
                {albumObj.type.charAt(0).toUpperCase() + albumObj.type.slice(1)}
                <> </>
                <span>&#8226;</span>
                <> </>
                {albumObj.release_date}
                <> </>
                <span>&#8226;</span>
                <> </>
                {albumObj.tracks.total + " tracks"}
              </Text>




            </Group>
          </Grid.Col>
          <Grid.Col span={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }} >
            <Group direction='column' position='center'>
              <Group>
                <Group direction='column' position='center'>
                  <Title order={2}>{avgRatingVal}</Title>
                  <Text>Average rating</Text>
                </Group>
                <Divider orientation='vertical' size='md' />
                <Group direction='column' position='center'>
                  <Title order={2}>{ratingVal}</Title>
                  <Text>Your rating</Text>
                </Group>
              </Group>

              <Divider size='md' />
              <Container size={250}>
                <Slider size='md' min={0} max={10} step={0.5} value={sliderVal} onChange={setSliderVal} />

                {session && <><Button onClick={callPostAlbum} variant="gradient" gradient={{ from: 'grape', to: 'violet' }} style={{ marginTop: 15 }}>Rate Album</Button></>}
                {!session && <><Button disabled style={{ marginTop: 15 }}>Log In to Rate</Button></>}

              </Container>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>

    <Group direction='column' position='center' spacing='5'>
      <Space h={40} />
    </Group>
    <TrackList tracks={albumObj.tracks.items} />
  </Box>
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
      //   return spotifyApi.getArtist(`${album.artists[0].id}`)
      // })
      // .then(function(data) {
      //   console.log("artist info")
      //   console.log(data.body)
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