import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { formatDate, getAnnouncement } from "@/lib/announcements";

// W02 / W05 – Chi tiết thông báo (UC02). Khách mở qua link, không cần đăng nhập.
// `?moi=1` → vừa đăng xong: hiện khung "Đã đăng" + sao chép link (UC05).
export default function AnnouncementPage(props: PageProps<"/thong-bao/[id]">) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-surface" />}>
      <AnnouncementDetail {...props} />
    </Suspense>
  );
}

async function AnnouncementDetail({ params, searchParams }: PageProps<"/thong-bao/[id]">) {
  await connection();
  const { id } = await params;
  const { moi } = await searchParams;
  const a = await getAnnouncement(id);
  if (!a) notFound();

  const path = `/thong-bao/${a.id}`;

  return (
    <article>
      {moi === "1" && (
        <div className="mb-6 rounded-lg border border-success/40 bg-surface p-4">
          <p className="font-semibold text-success">✔ Đã đăng thông báo</p>
          <p className="mb-3 mt-1 text-sm text-muted">Gửi link này cho học viên:</p>
          <CopyLinkButton path={path} />
        </div>
      )}

      <Link href="/" className="text-sm text-accent hover:underline">
        ← Danh sách thông báo
      </Link>

      <h1 className="mt-4 text-2xl font-bold">{a.title}</h1>
      <p className="mt-1 text-sm text-muted">Đăng ngày {formatDate(a.createdAt)}</p>
      <hr className="my-5 border-line" />
      {/* Hiển thị dạng văn bản thuần, giữ xuống dòng – không render HTML */}
      <div className="whitespace-pre-line leading-relaxed">{a.content}</div>
    </article>
  );
}
