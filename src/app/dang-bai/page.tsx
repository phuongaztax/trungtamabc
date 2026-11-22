"use client";

import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  CONTENT_MAX,
  createAnnouncement,
  TITLE_MAX,
  validateAnnouncement,
  type AnnouncementErrors,
} from "@/lib/announcements";

// W04 / W04b / W06 – Đăng thông báo (UC04)
export default function NewAnnouncementPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  // 1a. Chưa đăng nhập → sang trang đăng nhập, xong quay lại
  useEffect(() => {
    if (!loading && !user) router.replace("/dang-nhap?next=/dang-bai");
  }, [loading, user, router]);

  if (loading || !user) return <p className="text-muted">Đang kiểm tra đăng nhập…</p>;

  // 1b. Không có quyền → 403
  if (!isAdmin) {
    return (
      <div className="py-10">
        <h1 className="text-xl font-bold">403 – Bạn không có quyền đăng bài</h1>
        <p className="mt-2 text-muted">Liên hệ quản trị viên để được cấp quyền.</p>
        <Link href="/" className="mt-6 inline-block text-accent hover:underline">
          ← Về danh sách thông báo
        </Link>
      </div>
    );
  }

  return <AnnouncementForm uid={user.uid} />;
}

function AnnouncementForm({ uid }: { uid: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<AnnouncementErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    // 4a. Bỏ trống → báo lỗi tại ô, giữ nguyên dữ liệu đã nhập
    const found = validateAnnouncement({ title, content });
    setErrors(found);
    if (found.title) return titleRef.current?.focus();
    if (found.content) return contentRef.current?.focus();

    setSubmitting(true);
    try {
      const id = await createAnnouncement({ title, content }, uid);
      router.push(`/thong-bao/${id}?moi=1`);
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : "";
      setFormError(
        code === "permission-denied"
          ? "Bạn không có quyền đăng bài."
          : "Không đăng được bài, vui lòng thử lại. Nội dung bạn nhập vẫn được giữ nguyên.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Đăng thông báo mới</h1>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {formError && (
          <p role="alert" className="rounded-md border border-danger/40 px-3 py-2 text-sm text-danger">
            ⚠ {formError}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Tiêu đề <span className="text-danger">*</span>
          </label>
          <input
            id="title"
            ref={titleRef}
            value={title}
            maxLength={TITLE_MAX}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
            }}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={`rounded-md border bg-surface px-3 py-2 ${errors.title ? "border-danger" : "border-line"}`}
          />
          {errors.title && (
            <p id="title-error" className="text-sm text-danger">
              ⚠ {errors.title}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-sm font-medium">
            Nội dung <span className="text-danger">*</span>
          </label>
          <textarea
            id="content"
            ref={contentRef}
            rows={10}
            value={content}
            maxLength={CONTENT_MAX}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((p) => ({ ...p, content: undefined }));
            }}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
            className={`rounded-md border bg-surface px-3 py-2 ${errors.content ? "border-danger" : "border-line"}`}
          />
          {errors.content && (
            <p id="content-error" className="text-sm text-danger">
              ⚠ {errors.content}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-accent px-5 py-2 font-medium text-surface disabled:opacity-60"
          >
            {submitting ? "Đang đăng…" : "Đăng"}
          </button>
          <Link href="/" className="rounded-md border border-line px-5 py-2">
            Hủy
          </Link>
        </div>
      </form>
    </>
  );
}
