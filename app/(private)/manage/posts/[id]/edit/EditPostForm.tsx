'use client'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useActionState, useEffect } from "react";
import { createPost } from "@/lib/actions/createPost";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import Image from "next/image";

type EditPostFormProps = {
  post: {
    id: string
    title: string
    content: string
    topImage?: string | null
    published: boolean
  }
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content)
  const [contentLength, setContentLength] = useState<number>(0);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [topImage, setTopImage] = useState(post.topImage);
  const [imagePreview, setImagePreview] = useState(post.topImage)
  console.log("Image Preview:", imagePreview);
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {}
  })

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file) // プレビュー用のURLを生成
      console.log("Preview URL:", previewUrl);
      setImagePreview(previewUrl) // プレビューを更新
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview) // メモリリークを防ぐためにオブジェクトURLを解放
      }
    }
  }, [imagePreview, post.topImage])


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 ">新規記事投稿(MarkDown対応)</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" name="title" id="title" placeholder="タイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {state.errors.title && (
            <p className='text-red-500 text-sm mt-1'>{state.errors.title.join(',')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} width={200} height={200} alt={title} priority />
            </div>
          )}
          {state.errors.topImage && (
            <p className='text-red-500 text-sm mt-1'>{state.errors.topImage.join(',')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="content">内容(Markdown)</Label>
          <TextareaAutosize
            id="content"
            name="content"
            placeholder="Markdown形式で記事の内容を入力してください"
            className="w-full p-2"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className='text-red-500 text-sm mt-1'>{state.errors.content.join(',')}</p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数 : {contentLength}
        </div>
        <div>
          <Button type="button" onClick={() => setPreview(!preview)}>
            {preview ? "プレビューを閉じる" : "プレビューを表示"}
          </Button>
        </div>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >{content}</ReactMarkdown>
          </div>
        )}

        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">更新する</Button>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
      </form>
    </div>
  )
}