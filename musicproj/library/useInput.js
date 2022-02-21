
import { Input } from '@nextui-org/react';
import React from 'react';

export default function useInput() {

  // Reference: https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks

  const [inputValue, setInputValue ] = React.useState("");

  const onChangeHandler = event => {
    setInputValue(event.target.value);
  }

  React.useEffect(() => {
    if (inputValue) {
      const data = fetch("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc&market=ES",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
      }
    }).then(response => response.json()).then(data => console.log(data));
    }
  });

  return (
    <div>
      <Input size='xl' placeholder='Search' onChange={onChangeHandler} value={inputValue}/>
      <h1>{inputValue}</h1>
    </div>
  )
}






// export async function getStaticProps() {
  
//   const data = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds",
//   {  
//     headers: {
//     Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`
//     }
//   }).then(response => response.json());

//   return {
//     props: {
//       genres: data.genres
//     }
//   }
// }