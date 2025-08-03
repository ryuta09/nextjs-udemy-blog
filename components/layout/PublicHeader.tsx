
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList } from "@radix-ui/react-navigation-menu"
import SearchBox from "../post/SearchBox"
export default function PublicHeader() {
  return (
    <>
      <div>
        <header className="border-b bg-blue-200">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/docs" className="font-bold text-xl">
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              {/* <Input placeholder="記事を検索" className="w-[200px] lg:w-[300px] bg-white" /> */}
              <SearchBox />
              <Button variant={"outline"} asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href="/register">登録</Link>
              </Button>
            </div>

          </div>
        </header>
      </div>

    </>
  )
}