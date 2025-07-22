import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'CV Builder - Tạo CV Online Chuyên Nghiệp',
  description: 'Tạo CV online đẹp, chuyên nghiệp với nhiều mẫu thiết kế hiện đại. Dễ dàng tùy chỉnh và tải xuống CV của bạn.',
  keywords: 'CV online, tạo CV, resume builder, CV builder, việc làm, tuyển dụng',
  authors: [{ name: 'CV Builder Team' }],
  robots: 'index, follow',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'CV Builder - Tạo CV Online Chuyên Nghiệp',
    description: 'Tạo CV online đẹp, chuyên nghiệp với nhiều mẫu thiết kế hiện đại.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}