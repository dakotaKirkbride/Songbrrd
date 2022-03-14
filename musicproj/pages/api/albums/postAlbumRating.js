
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler( req, res ) {

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.userEmail
    }
  })

  const album = await prisma.album.upsert({
    where: {
      id: req.body.id
    },
    update: {

    },
    create: {
      id: req.body.id,
      albumName: req.body.name,
      artistName: req.body.artists[0].name
    }
  })

  const albumRating = await prisma.albumRating.upsert({
    where: {
      userId_albumId: {
        userId: user.id,
        albumId: req.body.id
      }
    },
    update: {
      rating: req.body.rating
    },
    create: {
      userId: user.id,
      albumId: req.body.id,
      rating: req.body.rating
    }
  })
}

