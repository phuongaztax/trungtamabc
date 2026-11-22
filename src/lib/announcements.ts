import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  type DocumentSnapshot,
} from "firebase/firestore/lite";
import { db } from "./firebase";

export const ANNOUNCEMENTS = "announcements";
export const TITLE_MAX = 200;
export const CONTENT_MAX = 20000;

export type Announcement = {
  id: string;
  title: string;
  content: string;
  /** ISO string – có thể truyền từ Server sang Client Component */
  createdAt: string | null;
};

function toAnnouncement(snap: DocumentSnapshot): Announcement {
  const data = snap.data() ?? {};
  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null;
  return {
    id: snap.id,
    title: String(data.title ?? ""),
    content: String(data.content ?? ""),
    createdAt,
  };
}

/** Danh sách thông báo, mới nhất ở đầu. */
export async function listAnnouncements(max = 50): Promise<Announcement[]> {
  const q = query(collection(db, ANNOUNCEMENTS), orderBy("createdAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map(toAnnouncement);
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  const snap = await getDoc(doc(db, ANNOUNCEMENTS, id));
  return snap.exists() ? toAnnouncement(snap) : null;
}

export type AnnouncementInput = { title: string; content: string };
export type AnnouncementErrors = Partial<Record<keyof AnnouncementInput, string>>;

/** Kiểm tra dữ liệu bắt buộc (phía client). Firestore Rules kiểm tra lại phía server. */
export function validateAnnouncement(input: AnnouncementInput): AnnouncementErrors {
  const errors: AnnouncementErrors = {};
  if (!input.title.trim()) errors.title = "Vui lòng nhập tiêu đề";
  else if (input.title.trim().length > TITLE_MAX) errors.title = `Tiêu đề tối đa ${TITLE_MAX} ký tự`;
  if (!input.content.trim()) errors.content = "Vui lòng nhập nội dung";
  else if (input.content.trim().length > CONTENT_MAX) errors.content = `Nội dung tối đa ${CONTENT_MAX} ký tự`;
  return errors;
}

export async function createAnnouncement(input: AnnouncementInput, authorUid: string): Promise<string> {
  const ref = await addDoc(collection(db, ANNOUNCEMENTS), {
    title: input.title.trim(),
    content: input.content.trim(),
    authorUid,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(iso));
}
