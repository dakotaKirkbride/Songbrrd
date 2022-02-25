
import { Container, Title, Text, Paper, Divider, Space, Group } from '@mantine/core';

export default function trackList( {tracks} ) {

  return (
    <Container>
      <Title>Tracks</Title>
      <Paper padding="md" shadow="lg" radius="lg">
        {tracks.map((track) => (
          <div>
            <Space h="xs"/>
            <Group>
              <Text size='sm'>{track.track_number}</Text>
              <Text size='lg'>{track.name}</Text>
            </Group>
            <Space h="xs"/>
            <Divider/>
          </div>))}
      </Paper>
    </Container>
  );
}