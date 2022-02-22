
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useDebounce } from '../hooks/debounceHook';
import SearchItem from './searchItem';
import { useClickOutside } from '@mantine/hooks';
import { Group } from '@mantine/core';

export default function SearchBar () {

  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isEmpty = !searchResults || searchResults.length === 0;

  const handleClickOutside = () => {
    setSearchVal("");
    setSearchResults([]);
  }

  const ref = useClickOutside(handleClickOutside);

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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_OAUTH_TOKEN}`
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
    <div ref={ref}>
      <Group position='center' direction='column'>
        <Input size='xl' placeholder='Search for Album' value={searchVal} onChange={changeHandler}/>
        {!isLoading && !isEmpty && <>
          {searchResults.map((searchResult) => (
            <SearchItem 
              obj={searchResult}
              id={searchResult.id}
              imgSource={searchResult.images[1].url} 
              albumName={searchResult.name}
              artistName={searchResult.artists[0].name}
              year={searchResult.release_date.slice(0,4)}/>
          ))}
        </>}
      </Group>
    </div>
  );
}