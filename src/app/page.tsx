import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { formatDate, listAnnouncements } from "@/lib/announcements";

// W01 – Danh sách thông báo (UC01). Ai cũng xem được.
export default function HomePage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Thông báo</h1>
      <Suspense fallback={<ListSkeleton />}>
        <AnnouncementList />
      </Suspense>
    </>
  );
}

async function AnnouncementList() {
  await connection(); // luôn lấy dữ liệu mới mỗi lần tải trang
  const items = await listAnnouncements();

  if (items.length === 0) {
    return <p className="text-muted">Chưa có thông báo.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((a, i) => (
        <li key={a.id}>
          <Link
            href={`/thong-bao/${a.id}`}
            className="block rounded-lg border border-line bg-surface p-4 transition hover:border-accent"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{a.title}</h2>
              {i === 0 && (
                <span className="shrink-0 rounded bg-accent px-1.5 py-0.5 text-xs font-medium text-surface">
                  MỚI
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted">{formatDate(a.createdAt)}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{a.content}</p>
            <span className="mt-2 inline-block text-sm text-accent">Xem chi tiết →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ListSkeleton() {
  return (
    <ul className="flex flex-col gap-4" aria-busy="true" aria-label="Đang tải">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-28 animate-pulse rounded-lg border border-line bg-surface" />
      ))}
    </ul>
  );
}
