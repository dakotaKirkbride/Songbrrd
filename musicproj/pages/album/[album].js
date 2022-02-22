
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Album = ( { albumId, albumName, artistName, albumImg} ) => {

  console.log(albumId);

  return (
    <>
    <h1>{albumName}</h1>
    <h2>An album by {artistName}</h2>
    <img src={albumImg}/>
    </>
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