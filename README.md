# Buoi4 Blog – Thông báo khai giảng

Website để người phụ trách trung tâm đăng thông báo (tiêu đề + nội dung) và gửi link cho học viên đọc mà không cần tài khoản.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Firebase Auth + Cloud Firestore

## Chạy ở máy

```bash
npm install
cp .env.example .env.local   # điền cấu hình Firebase Web App (xem docs/firebase.md)
npm run dev                  # http://localhost:3000
```

## Trang

| Đường dẫn | Mô tả |
|---|---|
| `/` | Danh sách thông báo, mới nhất ở đầu |
| `/thong-bao/[id]` | Chi tiết thông báo – ai cũng đọc được |
| `/dang-nhap` | Đăng nhập người phụ trách |
| `/dang-bai` | Đăng thông báo (chỉ tài khoản có trong `admins`) |

## Phân quyền

Quyền đăng bài được kiểm tra ở server bằng [firestore.rules](firestore.rules): chỉ tài khoản có document `admins/{uid}` mới tạo được bài. Hướng dẫn cấp quyền: [docs/firebase.md](docs/firebase.md).

## Tài liệu

- Đặc tả use case: [docs/specs/thong-bao-usecase.md](docs/specs/thong-bao-usecase.md)
- Wireframe: [docs/specs/wireframes/](docs/specs/wireframes/)
