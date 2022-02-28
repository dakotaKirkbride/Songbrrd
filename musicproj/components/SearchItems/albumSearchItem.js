
import React from 'react';
import { Image, Grid, Title, Text, Container, Group, Center } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function albumSearchItem(props) {

  return (

    <Container className='searchItem' sx={(theme) => ({
      '&:hover': {
        backgroundColor: theme.colors.gray[1],
        borderRadius: 10
      },
      padding: 5
    })}>
      <Link href={`/album/${props.id}`} >
        <Grid align='flex-start' justify="flex-start" sx={{ width: 350 }}>
          <Grid.Col span={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Title sx={{ maxHeight: 45 }} lineClamp={1} order={4}>
                {props.albumName.length <= 50 ? (
                  props.albumName
                ) : (
                  props.albumName.substring(0, 50) + "...")}
              </Title>
              <Text color='grey' size='md'>{props.artistName}</Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Link>
    </Container>

  );
}

