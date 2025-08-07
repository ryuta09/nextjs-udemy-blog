'use server'

import { postSchema } from "@/app/validations/post"
import { saveImage } from "@/utils/image"
import { prisma } from "../prisma"
import { redirect } from "next/navigation"
import z from "zod"

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>
}

export async  function updatedPost (prevState: ActionState, formData: FormData): Promise<ActionState> {
  // フォームの情報を取得
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const topImage = formData.get('topImage') as File | null
  const topImageInput = topImage instanceof File ? topImage : null
  const postId = formData.get('postId') as string
  const published = formData.get('published') === 'true'
  const oldImageUrl = formData.get('oldImageUrl') as string

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
  let imageUrl: string | null = oldImageUrl

  if(topImage instanceof File && topImage.size > 0 && topImage.name !== "undefined") {
      const newImageUrl = await saveImage(topImage)
    if(!newImageUrl) {
      return {success: false, errors: { image: [ '画像の保存に失敗しました']} }
    }
    imageUrl = newImageUrl
  }


  // DB保存
  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title,
      content,
      topImage: imageUrl,
      published: true,
    }
  })

  redirect('/dashboard')

  
}