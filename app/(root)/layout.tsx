import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

import UserProfileMenu from "@/components/UserProfileMenu";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between px-4 py-2 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="EduAi Logo" width={38} height={32} />
          <h2 className="text-amber-500">EduAi✨</h2>
        </Link>
        <div className="ml-auto">
          <UserProfileMenu />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
