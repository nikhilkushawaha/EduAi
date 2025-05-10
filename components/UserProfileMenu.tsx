// components/UserProfileMenu.tsx
import { getCurrentUser } from "@/lib/actions/auth.action";
import { logoutAction } from "@/lib/actions/auth.action";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default async function UserProfileMenu() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="ml-auto mr-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-12 h-12 rounded-full bg-neutral-700 border-2 border-gray-500 text-white text-lg font-bold flex items-center justify-center shadow-2xl hover:shadow-lg transition">
            <User className="w-10 h-10" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-xl shadow-lg">
          <div className="px-4 py-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <DropdownMenuItem asChild>
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full text-left text-sm text-red-600 hover:text-red-700 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
