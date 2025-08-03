'use client'
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
export default function SearchBox() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  // デバウンス
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100)
    return () => clearTimeout(timer);
  }, [search])

  // debouncedSearchが変わったら、検索を実行
  useEffect(() => {
    if(debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`) // 検索結果ページへ遷移
    } else {
      router.push('/') // 検索が空の場合はトップページへ
    }
  },[debouncedSearch, router])

  return (
    <>
      <Input placeholder="記事を検索" className="w-[200px] lg:w-[300px] bg-white" value={search} onChange={(e) => setSearch(e.target.value) }/>
    </>
  )
}