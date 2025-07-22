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

### Tùy chọn (cho OAuth):
6. **GOOGLE_CLIENT_ID** - Google OAuth Client ID
7. **GOOGLE_CLIENT_SECRET** - Google OAuth Client Secret
8. **FACEBOOK_CLIENT_ID** - Facebook OAuth Client ID
9. **FACEBOOK_CLIENT_SECRET** - Facebook OAuth Client Secret

## Các bước deploy:

1. Import project từ GitHub vào Vercel
2. Cấu hình environment variables ở trên
3. Deploy

## Lưu ý:
- File `vercel.json` đã được cập nhật để loại bỏ cấu hình env cũ
- Environment variables phải được cấu hình trực tiếp trên Vercel Dashboard
- Đảm bảo MongoDB Atlas cho phép kết nối từ tất cả IP (0.0.0.0/0) hoặc từ Vercel IPs