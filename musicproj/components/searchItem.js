
import React from 'react';
import { Card, Image } from '@mantine/core';
import { Link } from '@nextui-org/react';

export default function searchItem(props) {

  return (

    <div className='searchItem'>
      <Link href={`/album/${props.id}`}>
        <Card>
          <Image 
            src={props.imgSource}
            width={120}/>
          <h4>{props.albumName}</h4>
          <p>{props.artistName}</p>
          <p>{props.year}</p>
        </Card>
      </Link>
    </div>

  );

}