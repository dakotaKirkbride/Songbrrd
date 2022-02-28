import React from 'react';
import {Image, Grid, Title, Container, Center } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function artistSearchItem(props) {

  return (

    <Container className='searchItem' sx={(theme) => ({
      '&:hover': {
        backgroundColor: theme.colors.gray[1],
        borderRadius: 10
      },
      padding: 5
    })}>
      <Link href={'/'}>
        <Grid justify="flex-start" sx={{ width: 350 }}>
          <Grid.Col span={3}>
            <Center>
              <Image
                src={props.imgSource}
                alt={props.artistName}
                radius={90}

                width={75}
                height={75}
                fit="contain" />
            </Center>
          </Grid.Col>
          <Grid.Col span={9} sx={{ display: 'flex', alignItems: 'center' }}>
            <Title order={4}>{props.artistName}</Title>
          </Grid.Col>
        </Grid>
      </Link>
    </Container>
  );
}