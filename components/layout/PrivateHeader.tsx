import {
  NavigationMenuItem,
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { auth } from '../../app/auth'
import Setting from "./Settings"
import { redirect } from "next/navigation"

export default async function PrivateHeader() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }
  return (
    <header className="border-b bg-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" className="font-bold text-xl" passHref>
                管理ページ
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  )
}