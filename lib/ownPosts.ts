import { prisma } from "./prisma";

export async function getOwnPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      published: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
}