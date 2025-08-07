'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import DeletePostDialog from "./deletePostDialog"
import { useState } from "react"
import { set } from "date-fns"



export default function PostDropDownMenu({ postId }: { postId: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open)
    if(!open) {
      setIsDropdownOpen(false) // ダイアログが閉じられたらドロップダウンも閉じる
    }
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="px-2 py-1 border rounded-md">...</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}`} className="cursor-pointer">詳細</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/manage/posts/${postId}/edit`} className="cursor-pointer">編集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 cursor-pointer"
            onSelect={() => {
              setIsDropdownOpen(false)
              setShowDeleteDialog(true)
            }}
          >削除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeleteDialog && (
        <DeletePostDialog postId={postId} isOpen={showDeleteDialog} onOpenChange={handleDeleteDialogChange} />
      )}
    </>
  )
}