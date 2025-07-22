# CV Builder - Tạo CV Online Chuyên Nghiệp

Ứng dụng web tạo CV online với nhiều mẫu thiết kế đẹp mắt, hỗ trợ đăng nhập qua Google/Facebook và lưu trữ trên MongoDB.

## 🚀 Demo

- **Production**: [https://www.cleanspark.site/](https://www.cleanspark.site/)
- **Local Development**: http://localhost:3000

## ✨ Tính năng

- 🎨 Nhiều mẫu CV chuyên nghiệp
- 👤 Đăng ký/Đăng nhập với email hoặc OAuth (Google, Facebook)
- 💾 Lưu trữ CV trên cloud (MongoDB)
- 📱 Responsive design
- 🌐 Hỗ trợ tiếng Việt
- 🔒 Bảo mật với NextAuth.js

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Ant Design
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Authentication**: NextAuth.js với Google & Facebook OAuth

## 📦 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd mycv
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env.local` từ `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật các giá trị trong `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000  # Cho development
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

### 4. Chạy ứng dụng

```bash
npm run dev
```

Truy cập http://localhost:3000

## 🚀 Deployment lên Vercel

### 1. Chuẩn bị

- Tài khoản Vercel
- Repository trên GitHub/GitLab
- MongoDB Atlas database
- Google & Facebook OAuth apps

### 2. Cấu hình OAuth cho Production

#### Google OAuth:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo hoặc chọn project
3. Bật Google+ API
4. Tạo OAuth 2.0 credentials
5. Thêm authorized redirect URIs:
   - `https://your-domain.com/api/auth/callback/google`
   - `https://www.cleanspark.site/api/auth/callback/google`

#### Facebook OAuth:
1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới
3. Thêm Facebook Login product
4. Cấu hình Valid OAuth Redirect URIs:
   - `https://your-domain.com/api/auth/callback/facebook`
   - `https://www.cleanspark.site/api/auth/callback/facebook`

### 3. Deploy lên Vercel

1. **Import project từ Git**:
   - Đăng nhập Vercel
   - Import repository
   - Chọn framework: Next.js

2. **Cấu hình Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=https://www.cleanspark.site
   NEXTAUTH_SECRET=your-production-secret
   NEXT_PUBLIC_BASE_URL=https://www.cleanspark.site
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
   ```

3. **Deploy**:
   - Click "Deploy"
   - Vercel sẽ tự động build và deploy

### 4. Cấu hình Custom Domain (Optional)

1. Trong Vercel dashboard, vào Settings > Domains
2. Thêm custom domain: `www.cleanspark.site`
3. Cấu hình DNS records theo hướng dẫn

## 🔧 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run start    # Chạy production server
npm run lint     # Lint code
```

## 📁 Cấu trúc thư mục

```
mycv/
├── app/                 # Next.js 13+ App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── editor/         # CV editor
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utilities & configs
├── models/            # MongoDB models
├── public/            # Static assets
└── types/             # TypeScript types
```

## 🔐 Bảo mật

- Sử dụng NextAuth.js cho authentication
- Mã hóa mật khẩu với bcryptjs
- Validate input trên cả client và server
- HTTPS cho production
- Environment variables cho sensitive data

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License

## 📞 Liên hệ

- Website: [https://www.cleanspark.site/](https://www.cleanspark.site/)
- Email: support@cleanspark.site