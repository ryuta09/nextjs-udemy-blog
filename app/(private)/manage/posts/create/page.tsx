'use client'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function createPage() {
  const [content, setContent] = useState('')
  const [contentLength, setContentLength] = useState<number>(0);
  const [preview, setPreview] = useState(false);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 ">新規記事投稿(MarkDown対応)</h1>
      <form action="" className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" name="title" id="title" placeholder="タイトルを入力してください" />
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

        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">投稿する</Button>

      </form>
    </div>
  )
}