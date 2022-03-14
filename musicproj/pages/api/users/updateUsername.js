
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

  const email = req.query.email;
  const username = req.query.username;
  console.log(email)
  console.log(username)

  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: username,
    },
  })
  console.log("post successful");
}