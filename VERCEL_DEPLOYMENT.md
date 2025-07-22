# Hướng dẫn Deploy lên Vercel

## Cấu hình Environment Variables

Sau khi import project lên Vercel, bạn cần cấu hình các environment variables sau trong Vercel Dashboard:

### Bắt buộc:
1. **MONGODB_URI** - Connection string MongoDB Atlas
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

2. **NEXTAUTH_SECRET** - Secret key cho NextAuth.js
   ```
   your-super-secret-key-here
   ```

3. **NEXTAUTH_URL** - URL production của ứng dụng
   ```
   https://your-app-name.vercel.app
   ```

4. **NEXTAUTH_URL_INTERNAL** - Internal URL cho Vercel (giống NEXTAUTH_URL)
   ```
   https://your-app-name.vercel.app
   ```

5. **NEXT_PUBLIC_BASE_URL** - Base URL cho client
   ```
   https://your-app-name.vercel.app
   ```

### Tùy chọn (cho OAuth - nếu muốn đăng nhập bằng Google/Facebook):
6. **GOOGLE_CLIENT_ID** - Google OAuth Client ID
   ```
   your-google-client-id
   ```
7. **GOOGLE_CLIENT_SECRET** - Google OAuth Client Secret
   ```
   your-google-client-secret
   ```
8. **FACEBOOK_CLIENT_ID** - Facebook OAuth Client ID
   ```
   your-facebook-client-id
   ```
9. **FACEBOOK_CLIENT_SECRET** - Facebook OAuth Client Secret
   ```
   your-facebook-client-secret
   ```

**Lưu ý về OAuth:**
- Nếu không cấu hình các biến OAuth, chỉ có đăng nhập bằng email/password
- Để có nút "Đăng nhập với Google/Facebook", bạn cần:
  1. Tạo Google OAuth App tại [Google Cloud Console](https://console.cloud.google.com/)
  2. Tạo Facebook App tại [Facebook Developers](https://developers.facebook.com/)
  3. Thêm các environment variables tương ứng vào Vercel

## Các bước deploy:

1. Import project từ GitHub vào Vercel
2. Cấu hình environment variables ở trên
3. Deploy

## Lưu ý:
- File `vercel.json` đã được cập nhật để loại bỏ cấu hình env cũ
- Environment variables phải được cấu hình trực tiếp trên Vercel Dashboard
- Đảm bảo MongoDB Atlas cho phép kết nối từ tất cả IP (0.0.0.0/0) hoặc từ Vercel IPs

## Troubleshooting:

### 1. Không thấy nút "Đăng nhập với Google/Facebook"
**Nguyên nhân:** Chưa cấu hình OAuth environment variables
**Giải pháp:** 
- Thêm `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET` vào Vercel
- Hoặc chỉ sử dụng đăng nhập bằng email/password (không cần OAuth)

### 2. Lỗi khi đăng ký tài khoản
**Nguyên nhân có thể:**
- MongoDB connection string không đúng
- MongoDB Atlas chưa cho phép kết nối từ Vercel
- Thiếu `NEXTAUTH_SECRET`

**Giải pháp:**
- Kiểm tra `MONGODB_URI` trong Vercel Dashboard
- Đảm bảo MongoDB Atlas Network Access cho phép `0.0.0.0/0`
- Kiểm tra `NEXTAUTH_SECRET` đã được cấu hình

### 3. Lỗi "Server Error" khi truy cập website
**Nguyên nhân:** Thiếu environment variables bắt buộc
**Giải pháp:** Đảm bảo đã cấu hình đầy đủ 5 biến bắt buộc:
- `MONGODB_URI`
- `NEXTAUTH_SECRET` 
- `NEXTAUTH_URL`
- `NEXTAUTH_URL_INTERNAL`
- `NEXT_PUBLIC_BASE_URL`