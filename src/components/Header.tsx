"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SITE_NAME } from "@/lib/site";
import { useAuth } from "./AuthProvider";

export function Header() {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="border-b border-line bg-surface">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 text-sm">
        <Link href="/" className="font-bold tracking-wide">
          {SITE_NAME}
        </Link>
        <Link href="/" className="text-muted hover:text-foreground">
          Thông báo
        </Link>
        {isAdmin && (
          <Link href="/dang-bai" className="text-muted hover:text-foreground">
            Đăng bài
          </Link>
        )}
        <span className="ml-auto flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <span className="hidden text-muted sm:inline">Xin chào, {user.email}</span>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                className="text-muted hover:text-foreground"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link href="/dang-nhap" className="text-muted hover:text-foreground">
              Đăng nhập
            </Link>
          )}
        </span>
      </nav>
    </header>
  );
}
