
import { Container, Title, Text, Paper, Divider, Space, Group, Box } from '@mantine/core';

export default function trackList( {tracks} ) {

  return (
    <Container sx={{ maxWidth: 1200
    }}>
      <Title>Tracks</Title>
      <Paper padding="md" shadow="xl" radius="lg">
        {tracks.map((track) => (
          <Box sx={(theme) => ({
            paddingLeft: 10,
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                borderRadius: 10
            },
          })}>
            <Space h="xs"/>
            <Group>
              <Text size='sm'>{track.track_number}</Text>
              <Text size='lg'>{track.name}</Text>
            </Group>
            <Space h="xs"/>
          </Box>))}
      </Paper>
    </Container>
  );
}