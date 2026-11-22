# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong dự án này.

> ⚠️ Dự án **chưa có đặc tả**. Các mục đánh dấu `TODO` cần được điền khi có spec.
> Khi chưa có thông tin, **hỏi lại** thay vì tự đoán stack hay yêu cầu.

## Tổng quan dự án

- **Tên:** Buoi4_blog
- **Loại:** Web (blog)
- **Mục tiêu:** TODO
- **Người dùng chính:** TODO

## Tech stack

- **Frontend:** Next.js 16 (App Router, Cache Components bật), React 19, TypeScript, Tailwind CSS 4
- **Backend:** Không có server riêng. Firebase Auth (Email/Password) + Firestore; bảo mật bằng `firestore.rules`
- **Package manager:** npm
- **Database:** Cloud Firestore – project `buoi4-blog-thongbao` (xem [docs/firebase.md](docs/firebase.md))
- **Hosting / Deploy:** Vercel – project `trungtamabc`, https://trungtamabc.vercel.app.
  Nối với GitHub `phuongaztax/trungtamabc`: push lên `main` → tự deploy production.
  Biến môi trường `NEXT_PUBLIC_FIREBASE_*` đã khai báo trên Vercel (Production/Preview/Development).

> ⚠️ Mọi lệnh `firebase` thay đổi cấu hình phải chỉ rõ `--project buoi4-blog-thongbao`.
> Không đụng tới project `buoi4-75f8b`.

## Cấu trúc thư mục

```
.
├── CLAUDE.md            # File này – hướng dẫn cho Claude
├── .claude/
│   ├── settings.json    # Cấu hình dùng chung (permissions, hooks) – commit
│   ├── commands/        # Slash command riêng của dự án (*.md)
│   ├── agents/          # Subagent riêng của dự án (*.md)
│   ├── skills/          # Skill riêng của dự án (<tên>/SKILL.md)
│   ├── hooks/           # Script được gọi từ hooks trong settings.json
│   └── rules/           # Quy tắc chi tiết, import vào CLAUDE.md khi cần
├── docs/
│   ├── specs/           # Đặc tả tính năng
│   └── decisions/       # Ghi chép quyết định kiến trúc (ADR)
├── src/                 # Mã nguồn
├── public/              # Tài nguyên tĩnh (ảnh, favicon…)
└── tests/               # Kiểm thử
```

## Lệnh thường dùng

```bash
npm install                 # cài đặt (cần .env.local – xem .env.example)
npm run dev                 # chạy dev tại http://localhost:3000
npm run build               # build production
npm run lint                # ESLint
npx tsc --noEmit            # kiểm tra kiểu
firebase deploy --only firestore:rules --project buoi4-blog-thongbao   # cập nhật Security Rules
```

## Kiến trúc chính

- `src/lib/firebase.ts` – khởi tạo Firebase, dùng **Firestore Lite** (REST) cho cả server lẫn client.
- `src/lib/announcements.ts` – đọc/ghi/validate thông báo (collection `announcements`).
- `src/components/AuthProvider.tsx` – trạng thái đăng nhập; quyền đăng bài = có doc `admins/{uid}`.
- Trang: `/` danh sách · `/thong-bao/[id]` chi tiết (`?moi=1` = vừa đăng) · `/dang-nhap` · `/dang-bai`.
- Trang đọc Firestore ở Server Component phải gọi `await connection()` và nằm trong `<Suspense>` (yêu cầu của Cache Components).
- Next.js bản này có thay đổi lớn – đọc `node_modules/next/dist/docs/` trước khi viết code (xem [AGENTS.md](AGENTS.md)).

## Quy ước code

- TODO: ngôn ngữ, style guide, formatter/linter
- TODO: quy ước đặt tên file, component, biến
- Không commit file bí mật (`.env`, khóa API…).

## Quy trình làm việc

1. Đọc spec trong `docs/specs/` trước khi code một tính năng.
2. Quyết định kiến trúc quan trọng → ghi vào `docs/decisions/`.
3. Chạy test/lint trước khi báo hoàn thành.

## Ghi chú thêm

- TODO
