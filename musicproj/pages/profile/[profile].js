
import { getSession } from 'next-auth/react';
import { Link } from '@nextui-org/react';
import { Image, Box, Container, Paper, Text, Space, Grid, SimpleGrid } from '@mantine/core';
import Header from '../../components/header';
import { PrismaClient } from "@prisma/client";
import spotifyApi from '../../library/spotify';

const prisma = new PrismaClient()

export default function profile({ user, albums }) {

  return (
    <Box sx={(theme) => ({
      backgroundColor: theme.colors.gray[1],
      paddingBottom: 200
    })}>
      <Header />
      <Container sx={{ maxWidth: 1200, marginTop: 200, display: 'flex', flexDirection: 'column' }}>
        <Paper radius={110} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 160, width: 220, height: 220, marginLeft: 40 }}>
          <Image width={200} radius={100} src={user.user.image} sx={{ display: 'flex', justifyContent: 'center' }} />
        </Paper>
        <Paper shadow='xl' radius='lg' padding='xl' sx={{ maxWidth: 1200, height: 220, display: 'flex', alignItems: 'flex-end', marginBottom: 60 }}>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Text weight={700} sx={{ marginLeft: 20, fontSize: 30 }}>@{user.username}</Text>
            <Space w={250}/>
            <Text color='gray' sx={{ fontSize: 20 }}>{albums.length} albums reviewed</Text>
          </Box>
        </Paper>
        <Text weight={700} sx={{ fontSize: 35}}>Rated Albums</Text>
        <Paper shadow='xl' radius='lg' padding='xl' sx={{ minHeight: 300}}>
          <Grid>
            {albums.map((album) => (
              <Grid.Col span={3}>
                <Link href={`/album/${album.id}`}>
                  <Image radius={4}src={album.images[0].url}/>
                </Link>
                <SimpleGrid cols={2}>
                  <Box>
                    <Text weight={600}>{album.name}</Text>
                    <Text color='gray'>{album.artists[0].name}</Text>
                  </Box>
                  <Text weight={700} sx={{display: 'flex', justifyContent: 'flex-end', fontSize: 35, marginRight: 20}}>{album.rating}</Text>
                </SimpleGrid>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

let albums = []

export async function getServerSideProps(context) {

  const session = await getSession(context);
  let userInfo = session;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  // console.log(user)
  userInfo['username'] = user.username;
  // console.log(userInfo)

  const albumRatings = await prisma.albumRating.findMany({
    where: {
      userId: user.id
    }
  })

  // console.log(albumRatings)
  let albumIdList = [];

  albumRatings.forEach(albumRating => {
    albumIdList.push(albumRating.albumId)
  });

  await spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getAlbums(albumIdList)
    })
    .then(function (data) {
      albums = data.body.albums;
      // console.log(albums);
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  let albumCount = 0;
  albums.forEach(album => {
    album['rating'] = albumRatings[albumCount].rating;
    albumCount++;
  })

  // console.log(albums);

  if (!session) {
    console.log("NO SESSION");
  }
  // console.log(session.user.email);
  return {
    props: {
      user: userInfo,
      albums: albums,
    },
  };

}