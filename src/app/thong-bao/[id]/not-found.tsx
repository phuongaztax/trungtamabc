import Link from "next/link";

// W06 – 404: link sai hoặc thông báo không tồn tại (UC02 – 2a)
export default function AnnouncementNotFound() {
  return (
    <div className="py-10">
      <h1 className="text-xl font-bold">404 – Không tìm thấy thông báo</h1>
      <p className="mt-2 text-muted">Link có thể sai hoặc thông báo không còn.</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">
        ← Về danh sách thông báo
      </Link>
    </div>
  );
}
