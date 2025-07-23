# Hướng dẫn thay đổi Domain

Khi cần thay đổi domain cho dự án, bạn chỉ cần thực hiện các bước sau:

## 1. Cập nhật biến môi trường

Trong file `.env.local` (hoặc `.env.production` trên server):

```env
# Thay đổi domain name
DOMAIN_NAME=your-new-domain.com

# Cập nhật các URL base nếu cần
NEXTAUTH_URL=https://www.your-new-domain.com
NEXT_PUBLIC_BASE_URL=https://www.your-new-domain.com
```

## 2. Cập nhật cấu hình Vercel

Trong file `vercel.json`, cập nhật phần redirects:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "your-new-domain.com"  // Thay đổi ở đây
        }
      ],
      "destination": "https://www.your-new-domain.com/$1",  // Và ở đây
      "permanent": true
    }
  ]
}
```

## 3. Cập nhật DNS và Domain Settings

- Cập nhật DNS records để trỏ domain mới về Vercel
- Cập nhật domain settings trong Vercel dashboard
- Cập nhật OAuth callback URLs trong Google/Facebook Developer Console

## 4. Các file được tự động cập nhật

Các file sau sẽ tự động sử dụng domain mới thông qua biến môi trường `DOMAIN_NAME`:

- `app/layout.tsx` - Base URL cho metadata
- `app/api/auth/resend-verification/route.ts` - Host fallback
- `lib/auth.ts` - Allowed domains cho redirect
- `.env.local` và `.env.example` - FROM_EMAIL

## 5. Kiểm tra sau khi thay đổi

- [ ] Đăng nhập/đăng ký hoạt động bình thường
- [ ] Email verification được gửi từ domain mới
- [ ] OAuth (Google/Facebook) hoạt động
- [ ] Redirect từ non-www sang www hoạt động
- [ ] Mobile compatibility

## Lưu ý

- Luôn backup database trước khi thay đổi domain
- Test trên staging environment trước
- Cập nhật tất cả external services (OAuth, email, analytics, etc.)
- Thông báo cho users về việc thay đổi domain nếu cần