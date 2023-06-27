import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import React from 'react'
import Header from '../../components/header';
import spotifyApi from '../../library/spotify';

export default function Genres({ genres }) {

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Songbrrd</title>
        </Head>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>Genre List</h1>
          <ul>
            {genres.map(genre =>
              <li key={genre}>
                <Link href={`/genres/${genre}`}>
                  <a>{genre}</a>
                </Link>
              </li>)
            }
          </ul>
        </main>
      </div>
    </>
  )
}

let genreSeeds = [];

export async function getStaticProps() {

  await spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getAvailableGenreSeeds()
    })
    .then(function (data) {
      genreSeeds = data.body.genres;
      console.log(genreSeeds);
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  return {
    props: {
      genres: genreSeeds
    }
  }
}




