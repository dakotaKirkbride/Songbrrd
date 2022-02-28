import React from 'react';
import { Image, Grid, Title, Text, Container, Center, Group } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function trackSearchItem(props) {

  return (

    <Container className='searchItem' sx={(theme) => ({
      '&:hover': {
        backgroundColor: theme.colors.gray[1],
        borderRadius: 10
      },
      padding: 5
    })}>
      <Link href={`/album/${props.obj.album.id}`}>
        <Grid align='flex-start' justify="flex-start" sx={{ width: 350 }}>
          <Grid.Col span={3}>
            <Center>
              <Image
                src={props.imgSource}
                width={75}
                height={75}
                fit="contain" />
            </Center>
          </Grid.Col>
          <Grid.Col span={9}>
            <Group direction='column' spacing='xs'>
              <Title order={4}>
                {props.trackName.length < 50 ? (
                  props.trackName
                ) : (
                  props.trackName.substring(0, 50) + "...")}
              </Title>
              <Text color='black' size='md'>{props.artistName}</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Link>
    </Container>
  );
}