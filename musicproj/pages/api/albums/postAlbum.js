
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler( req, res ) {

  // const id = String(req.id);
  // const albumName = String(req.albumName);
  // const artistName = String(req.artistName);
  // const rating = String(req.rating);


  console.log(req.body);


  const album = await prisma.album.create({
    data: {
      id: req.body.id,
      albumName: req.body.name,
      artistName: req.body.artists[0].name,
      rating: req.body.rating
    },
  })
}

