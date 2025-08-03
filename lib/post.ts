import { prisma } from "./prisma";

export async function getPosts() {
  return await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}