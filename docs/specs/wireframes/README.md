# Wireframe – Thông báo khai giảng

Vẽ bằng PlantUML Salt. Sửa file `.puml`, xem trước bằng `Alt+D` trong VS Code.
Đặc tả liên quan: [../thong-bao-usecase.md](../thong-bao-usecase.md)

| Mã | Màn hình | Use case | Tiêu chí |
|---|---|---|---|
| [W01](W01-danh-sach.png) | Danh sách thông báo (mới nhất ở đầu) | UC01 | AC3, AC4 |
| [W02](W02-chi-tiet.png) | Chi tiết thông báo – khách mở qua link | UC02 | AC4 |
| [W03](W03-dang-nhap.png) | Đăng nhập (trạng thái sai mật khẩu) | UC03 | AC1 |
| [W04](W04-dang-bai.png) | Form đăng thông báo | UC04 | AC1 |
| [W04b](W04b-dang-bai-loi.png) | Form báo lỗi trường trống, giữ dữ liệu | UC04 – 4a | AC2 |
| [W05](W05-dang-thanh-cong.png) | Đăng thành công + sao chép link | UC04 – 6, UC05 | AC3 |
| [W06](W06-khong-co-quyen.png) | Lỗi 403 không có quyền / 404 không tìm thấy | UC04 – 1b, UC02 – 2a | AC4 |

## Luồng màn hình

```
Khách:          W01 ──► W02
Người phụ trách: W03 ──► W04 ──(lỗi)──► W04b ──► W05 ──► gửi link ──► (Học viên mở W02)
Không có quyền:  W04 ──► W06 (403)
Link sai:        W02 ──► W06 (404)
```
