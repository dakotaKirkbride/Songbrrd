
import React from 'react';
import { Card } from '@nextui-org/react';
import Image from 'next/image';

export default function searchItem( props ) {

  const { imgSource, albumName, artistName, year } = props;

  return (

    <div className='searchItem'>
      <Card>
        <img src={imgSource}/>
        <h4>{albumName}</h4>
        <p>{artistName}</p>
        <p>{year}</p>
      </Card>
    </div>

  );

}