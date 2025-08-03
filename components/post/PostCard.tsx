import { PostCardProps } from "@/app/types/post"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
export default function PostCard({ post }: PostCardProps) {

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 pt-0">
      <Link href={`/posts/${post.id}`}>
        {post.topImage && (
          <div className="relative w-full">
            <Image
              src={post.topImage}
              alt={post.title}
              width={600}
              height={400}
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader className="mt-4">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <time>{
              formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true, // 前
                locale: ja
              })}</time>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}