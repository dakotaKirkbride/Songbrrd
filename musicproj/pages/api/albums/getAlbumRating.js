import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {



  const user = await prisma.user.findUnique({
    where: {
      email: req.query.userEmail,
    }
  })

  const albumRating = await prisma.albumRating.findUnique({
    where: {
      userId_albumId: {
        userId: user.id,
        albumId: req.query.albumId
      }
    }
  })

  const avgRating = await prisma.albumRating.aggregate({
    where: {
      albumId: req.query.albumId
    },
    _avg: {
      rating: true,
    }
  })
  console.log("avgRating");
  console.log(avgRating._avg.rating);

  console.log(albumRating);

  res.status(200).json({ user: user, albumRating: albumRating, avgRating: avgRating._avg.rating })

}