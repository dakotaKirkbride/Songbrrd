import { getSession } from 'next-auth/react';
import { Link } from '@nextui-org/react';
import { Image, Box, Container, Paper, Text, Space, Grid, SimpleGrid } from '@mantine/core';
import PageHeader from '../../components/header';
import { PrismaClient } from "@prisma/client";
import spotifyApi from '../../library/spotify';

const prisma = new PrismaClient();

export default function Profile({ user, albums }) {
  return (
    <Box sx={(theme) => ({
      backgroundColor: theme.colors.gray[1],
      paddingBottom: 200
    })}>
      <PageHeader />
      <Container sx={{ maxWidth: 1200, marginTop: 200, display: 'flex', flexDirection: 'column' }}>
        <Paper radius={110} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 160, width: 220, height: 220, marginLeft: 40 }}>
          <Image width={200} radius={100} src={user.user.image} alt="Profile Image" sx={{ display: 'flex', justifyContent: 'center' }} />
        </Paper>
        <Paper shadow='xl' radius='lg' padding='xl' sx={{ maxWidth: 1200, height: 220, display: 'flex', alignItems: 'flex-end', marginBottom: 60 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Text weight={700} sx={{ marginLeft: 20, fontSize: 30 }}>@{user.username}</Text>
            <Space w={250} />
            <Text color='gray' sx={{ fontSize: 20 }}>{albums.length} albums reviewed</Text>
          </Box>
        </Paper>
        <Text weight={700} sx={{ fontSize: 35 }}>Rated Albums</Text>
        <Paper shadow='xl' radius='lg' padding='xl' sx={{ minHeight: 300 }}>
          <Grid>
            {albums.map((album) => (
              <Grid.Col span={3} key={album.id}>
                <Link href={`/album/${album.id}`}>
                  <Image radius={4} src={album.images[0]?.url} alt={album.name} />
                </Link>
                <SimpleGrid cols={2}>
                  <Box>
                    <Text weight={600}>{album.name}</Text>
                    <Text color='gray'>{album.artists[0]?.name}</Text>
                  </Box>
                  <Text weight={700} sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 35, marginRight: 20 }}>{album.rating}</Text>
                </SimpleGrid>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userInfo = session;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  userInfo['username'] = user.username;

  const albumRatings = await prisma.albumRating.findMany({
    where: {
      userId: user.id
    }
  })

  let albumIdList = albumRatings.map(albumRating => albumRating.albumId);

  await spotifyApi.clientCredentialsGrant()
    .then(async function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      const { body } = await spotifyApi.getAlbums(albumIdList);
      albums = body.albums;
      albums.forEach((album, index) => {
        album['rating'] = albumRatings[index].rating;
      });
    })
    .catch(function (err) {
      console.log('Something went wrong!', err);
    });

  if (!session) {
    console.log("NO SESSION");
  }

  return {
    props: {
      user: userInfo,
      albums: albums,
    },
  };
}
