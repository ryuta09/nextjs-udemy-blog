'use server'
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>
}

export default async function deletePost(postId: string): Promise<ActionState> {
  await prisma.post.delete({
    where: {
      id: postId
    }
  });

  redirect('/dashboard');
}