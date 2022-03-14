
// import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { useDebounce } from '../hooks/debounceHook';
import { useClickOutside } from '@mantine/hooks';
import { Group, Paper, ScrollArea, Divider, Container, TextInput, Loader } from '@mantine/core';
import AlbumSearchItem from './SearchItems/albumSearchItem';
import TrackSearchItem from './SearchItems/trackSearchItem';
import ArtistSearchItem from './SearchItems/artistSearchItem';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {

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

  const searchForValue = async () => {
    if (!searchVal || searchVal.trim() === "")
      return;

    setLoading(true);

    const data = await fetch(`/api/spotify/search?searchVal=${searchVal}`).then(response => response.json());
    console.log("Here is the data");
    console.log(data);

    if (data) {
      setLoading(false);
      setSearchResults(data.items);
      console.log(data.items);
    }
  };

  useDebounce(searchVal, 400, searchForValue);

  return (
    <div ref={ref}>
      <Group position='center' direction='column'>
        <TextInput size='md' placeholder='Search for albums, tracks, and artists' value={searchVal} onChange={changeHandler} radius="xl" icon={<SearchIcon />} style={{ width: 350 }} rightSection={isLoading && <Loader size='xs'/>} />
        {!isLoading && !isEmpty && <>
          <Container
            size="xl"
            sx={{
              position: 'absolute',
              top: 60,
              zIndex: 1
            }}>
            <ScrollArea
              type='scroll'
              sx={{
                width: 400,
                height: 500
              }}>
              <Paper
                radius='md'
                padding='sm'
                shadow='xl'
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0]
                })}>
                <Divider size='sm' label='Albums' />
                {searchResults.albums.items.map((album) => (
                  <AlbumSearchItem
                    obj={album}
                    id={album.id}
                    imgSource={album.images[1].url}
                    albumName={album.name}
                    artistName={album.artists[0].name}
                    year={album.release_date.slice(0, 4)} />
                ))}

                <Divider size="sm" label="Tracks" />
                {searchResults.tracks.items.map((track) => (
                  <TrackSearchItem
                    obj={track}
                    id={track.id}
                    imgSource={track.album.images[1].url}
                    trackName={track.name}
                    artistName={track.artists[0].name}
                    year={track.album.release_date.slice(0, 4)} />
                ))}

                <Divider size="sm" label="Artists" />
                {searchResults.artists.items.map((artist) => (
                  typeof artist.images[0] === "undefined" ? (
                    <ArtistSearchItem
                      obj={artist}
                      id={artist.id}
                      imgSource="https://i.scdn.co/image/ab67616100005174867008a971fae0f4d913f63a"
                      artistName={artist.name} />
                  ) : (
                    <ArtistSearchItem
                      obj={artist}
                      id={artist.id}
                      imgSource={artist.images[1].url}
                      artistName={artist.name} />
                  )
                ))}
              </Paper>
            </ScrollArea>
          </Container>
        </>}
      </Group>
    </div>
  )
}