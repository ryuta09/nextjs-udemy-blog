'use server'

import { postSchema } from "@/app/validations/post"
import { saveImage } from "@/utils/image"
import { prisma } from "../prisma"
import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import z from "zod"

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>
}

export async  function createPost (prevState: ActionState, formData: FormData): Promise<ActionState> {
  // フォームの情報を取得
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const topImage = formData.get('topImage') as File | null
  const topImageInput = topImage instanceof File ? topImage : null

   // バリデーション
  const validationResult = postSchema.safeParse({title, content, topImage})
  if(!validationResult.success) {
    const errors = z.flattenError(validationResult.error);
    return {
      success: false,
      errors: {
        title: errors.fieldErrors.title || [],
        content: errors.fieldErrors.content || [],
        topImage: errors.fieldErrors.topImage || [],
      }
    }
  }
   // 画像保存
  const imageUrl = topImage ? await saveImage(topImage) : null
  if(!topImage && !imageUrl) {
    return {success: false, errors: { image: [ '画像の保存に失敗しました']} }
  }

  // DB保存
  const session = await auth()
  const userId = session?.user?.id

  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです！')
  }

  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
      authorId: userId
    }
  })

  redirect('/dashboard')

  
}