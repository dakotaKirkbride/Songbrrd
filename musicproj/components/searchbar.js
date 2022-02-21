
import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { useDebounce } from '../hooks/debounceHook';
import SearchItem from './searchItem';

export default function SearchBar (props) {

  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isEmpty = !searchResults || searchResults.length === 0;

  const changeHandler = event => {
    event.preventDefault();
    setSearchVal(event.target.value);
  }

  const prepareSearchQuery = (query) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=5`

    return encodeURI(url);
  }

  const searchForValue = async () => {
    if (!searchVal || searchVal.trim() === "") 
      return;

    setLoading(true);

    const URL = prepareSearchQuery(searchVal);
    
    const data = await fetch(URL, 
      {
        headers: {
          // for some reason this provides a 401 bad token error
          // Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`

          // this syntax works though ... but only sometimes?
          // Authorization: "Bearer " + process.env.SPOTIFY_OAUTH_TOKEN
          Authorization: "Bearer BQCVLmaH9dnfebBHoJZlXNePi-l-fzfdVHqNDVX71r7_F9_wvfCjl1XBFpaTEj6WQ-6_mN7Q2o72LvQh_hr-4YfiVbIJTuuRbVrl2vYR5fNq5-q41GvJ90jRrZGYjxCeALPwbc7q28iWar_O-7otbM6y2z3AnjO1Yy0"
        }
      }).then(response => response.json());

      if (data) {
        setLoading(false);
        setSearchResults(data.albums.items);
        console.log("Response: ", data);
      }
  }; 

  useDebounce(searchVal, 500, searchForValue);

  return (
    <div className='SearchBar'>
      <Input clearable size='xl' placeholder='Search for Album' value={searchVal} onChange={changeHandler}/>
      {!isLoading && !isEmpty && <>
        {searchResults.map((searchResult) => (
          <SearchItem 
            imgSource={searchResult.images[1].url} 
            albumName={searchResult.name}
            artistName={searchResult.artists[0].name}/>
        ))}
      </>}
 
    </div>
  );
}