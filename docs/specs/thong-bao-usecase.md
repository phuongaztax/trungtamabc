# Đặc tả Use Case – Thông báo khai giảng

Sơ đồ: [thong-bao-usecase.puml](thong-bao-usecase.puml) (PlantUML)

## 1. Yêu cầu gốc

> Tôi phụ trách một trung tâm. Mỗi khi có lịch khai giảng mới, tôi muốn vào website của trung tâm, đăng nhập và tự đăng một thông báo gồm tiêu đề và nội dung. Sau khi đăng, tôi muốn gửi link trang thông báo cho học viên để họ mở ra đọc ngay, không cần tài khoản.

**Tiêu chí nghiệm thu**

- AC1: Người phụ trách đăng nhập và đăng bài ngay trên giao diện website.
- AC2: Nếu bỏ trống tiêu đề hoặc nội dung, web báo rõ chỗ cần điền và giữ lại phần đã nhập.
- AC3: Bài vừa đăng xuất hiện ở đầu danh sách. Tải lại trang vẫn thấy bài.
- AC4: Khách đọc được thông báo. Chỉ tài khoản được cấp quyền mới đăng được bài.

## 2. Tác nhân (Actor)

| Tác nhân | Mô tả |
|---|---|
| **Khách / Học viên** | Người không có tài khoản. Chỉ đọc thông báo. |
| **Người phụ trách** | Có tài khoản được cấp quyền đăng bài. Kế thừa mọi quyền của Khách. |

## 3. Danh sách Use Case

| Mã | Tên | Tác nhân | Tiêu chí |
|---|---|---|---|
| UC01 | Xem danh sách thông báo | Khách, Người phụ trách | AC3, AC4 |
| UC02 | Xem chi tiết thông báo (mở qua link) | Khách, Người phụ trách | AC4 |
| UC03 | Đăng nhập | Người phụ trách | AC1, AC4 |
| UC04 | Đăng thông báo | Người phụ trách | AC1, AC2, AC3, AC4 |
| UC05 | Sao chép link thông báo | Người phụ trách | Yêu cầu gốc |
| UC06 | Đăng xuất | Người phụ trách | — |

## 4. Đặc tả chi tiết

### UC01 – Xem danh sách thông báo

- **Tác nhân:** Khách, Người phụ trách
- **Tiền điều kiện:** Không có (không cần đăng nhập).
- **Luồng chính:**
  1. Người dùng mở trang danh sách thông báo.
  2. Hệ thống hiển thị các thông báo, **mới nhất ở trên cùng**, mỗi mục gồm tiêu đề, ngày đăng và link xem chi tiết.
- **Luồng phụ:**
  - 2a. Chưa có thông báo nào → hiển thị “Chưa có thông báo”.
- **Hậu điều kiện:** Không thay đổi dữ liệu.

### UC02 – Xem chi tiết thông báo

- **Tác nhân:** Khách, Người phụ trách
- **Tiền điều kiện:** Có link của thông báo (từ danh sách hoặc được gửi qua tin nhắn).
- **Luồng chính:**
  1. Người dùng mở link thông báo.
  2. Hệ thống hiển thị tiêu đề, nội dung và ngày đăng. **Không yêu cầu đăng nhập.**
- **Luồng phụ:**
  - 2a. Link sai hoặc thông báo không tồn tại → trang “Không tìm thấy thông báo” kèm link về danh sách.

### UC03 – Đăng nhập

- **Tác nhân:** Người phụ trách
- **Tiền điều kiện:** Đã được cấp tài khoản.
- **Luồng chính:**
  1. Người phụ trách mở trang đăng nhập.
  2. Nhập tên đăng nhập và mật khẩu, bấm “Đăng nhập”.
  3. Hệ thống xác thực thành công và chuyển tới trang đăng thông báo (hoặc trang đang định vào trước đó).
- **Luồng phụ:**
  - 3a. Sai thông tin → báo “Tên đăng nhập hoặc mật khẩu không đúng”, giữ lại tên đăng nhập, xóa ô mật khẩu.
- **Hậu điều kiện:** Phiên đăng nhập được tạo.

### UC04 – Đăng thông báo

- **Tác nhân:** Người phụ trách
- **Tiền điều kiện:** Đã đăng nhập bằng tài khoản có quyền đăng bài (*include* Kiểm tra quyền).
- **Luồng chính:**
  1. Người phụ trách mở form “Đăng thông báo”.
  2. Nhập **tiêu đề** và **nội dung**.
  3. Bấm “Đăng”.
  4. Hệ thống kiểm tra dữ liệu bắt buộc (*include* Kiểm tra tiêu đề & nội dung).
  5. Hệ thống lưu thông báo bền vững kèm thời gian đăng.
  6. Hệ thống báo đăng thành công, hiển thị link trang thông báo; bài mới nằm **đầu danh sách**.
- **Luồng phụ / ngoại lệ:**
  - 1a. Chưa đăng nhập → chuyển sang UC03, đăng nhập xong quay lại form.
  - 1b. Tài khoản không có quyền → báo “Bạn không có quyền đăng bài” (HTTP 403), không hiển thị form.
  - 4a. Tiêu đề và/hoặc nội dung bỏ trống (kể cả chỉ có khoảng trắng) → *extend* Báo lỗi:
    - Hiển thị thông báo lỗi **ngay dưới ô bị trống** (vd. “Vui lòng nhập tiêu đề”).
    - **Giữ nguyên** nội dung đã nhập ở các ô còn lại.
    - Không lưu bài; quay lại bước 2.
  - 5a. Lỗi lưu dữ liệu → báo lỗi chung, giữ lại dữ liệu đã nhập.
- **Quy tắc nghiệp vụ:**
  - Việc kiểm tra quyền phải thực hiện ở **phía server**, không chỉ ẩn nút trên giao diện.
  - Kiểm tra dữ liệu bắt buộc thực hiện ở cả client và server.
- **Hậu điều kiện:** Có thêm 1 thông báo; tải lại trang danh sách vẫn thấy.

### UC05 – Sao chép link thông báo

- **Tác nhân:** Người phụ trách
- **Tiền điều kiện:** Đang xem một thông báo (UC02) hoặc vừa đăng xong (UC04).
- **Luồng chính:**
  1. Bấm “Sao chép link”.
  2. Hệ thống chép URL trang chi tiết vào clipboard và báo “Đã sao chép”.
  3. Người phụ trách tự gửi link cho học viên (Zalo, email…). Việc gửi diễn ra ngoài hệ thống.

### UC06 – Đăng xuất

- **Tác nhân:** Người phụ trách
- **Luồng chính:** Bấm “Đăng xuất” → hệ thống hủy phiên, quay về trang danh sách.

## 5. Ma trận truy vết tiêu chí nghiệm thu

| Tiêu chí | Use Case / bước kiểm tra |
|---|---|
| AC1 | UC03, UC04 luồng chính |
| AC2 | UC04 – 4a |
| AC3 | UC04 – bước 5, 6; UC01 – bước 2 |
| AC4 | UC01, UC02 (không cần đăng nhập); UC04 – 1a, 1b |

## 6. Ngoài phạm vi (chưa có trong yêu cầu)

- Sửa / xóa thông báo
- Đăng ký tài khoản, quên mật khẩu, quản lý người dùng
- Tự động gửi link cho học viên (email/SMS)
- Đính kèm ảnh, định dạng nội dung (rich text)
