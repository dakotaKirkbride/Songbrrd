import Head from 'next/head'
import { Group, Center, Grid, Text, Container, Space, Image, Paper, Box } from '@mantine/core';
import styles from '../styles/Home.module.css'
import { React, useState } from 'react'
import Header from '../components/header';
import spotifyApi from '../library/spotify';
import { useViewportSize } from '@mantine/hooks';


export default function Home({ artistObj }) {

  const { height, width } = useViewportSize();

  return (<Box sx={(theme) => ({ 
    backgroundColor: theme.colors.gray[1],
    paddingBottom: 200})}>

    <Head>
      <title>Songbrrd</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <Container sx={{ maxWidth: 1200, marginTop: 100, minHeight: height }}>
      <Grid justify="center" gutter='xl'>
        <Grid.Col span={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
          <Text weight={700} variant="gradient" gradient={{ from: 'grape', to: 'violet' }} sx={{ fontSize: 80 }}>Welcome to Songbrrd</Text>
          <Space h={50} />
          <Text weight={700} variant="gradient" gradient={{ from: 'grape', to: 'violet' }} sx={{ fontSize: 50 }}>A social network for music lovers</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper
            radius='xl'
            shadow='xl'>
            <Image
              src={artistObj.images[0].url}
              radius='xl' />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container >
  </Box>
  )
}

let artist;

export async function getStaticProps() {

  // generate random letter to be used in spotify get request
  // const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const alphabet = "abcdefgijklmnopqrstuvwxyz"

  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
  // console.log(randomCharacter)

  await spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.searchArtists( randomCharacter, { limit: 1, offset: 0})
    }).then(function (data) {
      artist = data.body.artists.items[0];
      // console.log(artist);
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  return {
    props: {
      artistObj: artist,
    },
    revalidate: 3000
  }

}