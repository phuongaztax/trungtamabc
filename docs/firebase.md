# Firebase – thông tin dự án

| Mục | Giá trị |
|---|---|
| Project ID | `buoi4-blog-thongbao` |
| Project number | `468369244054` |
| Gói | Spark (miễn phí, chưa gắn thanh toán) |
| Web App | Buoi4 Blog Web – `1:468369244054:web:1831f5d744c184c7cca7b7` |
| Cloud Firestore | `(default)`, Native mode, `asia-southeast1` |
| Console | https://console.firebase.google.com/project/buoi4-blog-thongbao/overview |

> ⚠️ Tài khoản còn một project khác **`buoi4-75f8b`** ("Buoi4") – **không dùng** cho bài học này.
> Luôn kiểm tra `--project buoi4-blog-thongbao` (hoặc `.firebaserc`) trước khi đổi cấu hình.

## Cấu hình Web SDK

Config Web của Firebase là thông tin công khai (được nhúng vào trang web); bảo mật dữ liệu dựa vào **Firestore Security Rules**, không dựa vào việc giấu `apiKey`.

```js
const firebaseConfig = {
  apiKey: "AIzaSyCLsN2zUBWR1qN6P-oKBbzbwIynSaTzY0Y",
  authDomain: "buoi4-blog-thongbao.firebaseapp.com",
  projectId: "buoi4-blog-thongbao",
  storageBucket: "buoi4-blog-thongbao.firebasestorage.app",
  messagingSenderId: "468369244054",
  appId: "1:468369244054:web:1831f5d744c184c7cca7b7",
};
```

## Security Rules ([firestore.rules](../firestore.rules)) – đã deploy

- `announcements`: ai cũng **đọc**; chỉ admin **tạo**, bắt buộc tiêu đề + nội dung không rỗng; cấm sửa/xóa.
- `admins/{uid}`: người dùng chỉ đọc được doc của chính mình; client không ghi được.

## Cấp quyền đăng bài cho một tài khoản

1. Console → **Authentication → Users → Add user**: nhập email + mật khẩu. Sao chép **User UID**.
2. Console → **Firestore Database → Start collection** `admins` → Document ID = **UID vừa chép**,
   thêm 1 field bất kỳ (vd. `email` = email người đó) → Save.
3. Thu hồi quyền: xóa document `admins/{uid}`.

## Lệnh hay dùng

```bash
firebase use                      # xem project đang dùng (phải là buoi4-blog-thongbao)
firebase projects:list
firebase apps:sdkconfig WEB 1:468369244054:web:1831f5d744c184c7cca7b7
firebase firestore:databases:get "(default)"
```
