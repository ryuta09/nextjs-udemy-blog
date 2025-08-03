import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

type Params = {
  params: Promise<{ id: string }>
}
export default async function postDetail({ params }: Params) {
  const { id } = await params;
  const post = await getPost(id)

  if (!post) {
    notFound()
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto pt-0">
        {post.topImage && (
          <div className="relative w-full">
            <Image
              src={post.topImage}
              alt={post.title}
              width={600}
              height={400}
              className="w-full rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader >
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">{post.author.name}</p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: ja })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {post.content}
        </CardContent>
      </Card>
    </div>
  )
}