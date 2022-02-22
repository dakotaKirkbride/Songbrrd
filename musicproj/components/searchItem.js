
import React from 'react';
import { Card, Image, Grid, Title, Text, Container, Group } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function searchItem(props) {

  return (

    <Container className='searchItem' style = {{ width: 500}}>
      <Link href={`/album/${props.id}`}>
        <Card shadow="xl" radius="lg" style={{ minWidth: 500}}>
          <Grid>
            <Grid.Col span={4}>
              <Card 
                size={150}>
                <Image 
                  src={props.imgSource}
                  width={120}/>
              </Card>
            </Grid.Col>
            <Grid.Col span={8}>
              <Group direction='column' spacing='lg' style={{ marginTop: 10}}>
                <Title order={3}>{props.albumName}</Title>
                <Text size='md'>{props.artistName}</Text>
                <Text size='sm'>{props.year}</Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
      </Link>
    </Container>

  );

}