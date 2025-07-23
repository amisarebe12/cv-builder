'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  HomeOutlined,
  FileTextOutlined,
  FolderOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    {
      key: 'home',
      icon: <HomeOutlined className="text-lg" />,
      label: 'Trang chủ',
      href: '/',
      active: pathname === '/'
    },
    {
      key: 'templates',
      icon: <FileTextOutlined className="text-lg" />,
      label: 'Mẫu CV',
      href: '/#templates',
      active: false
    },
    {
      key: 'create',
      icon: <PlusOutlined className="text-lg" />,
      label: 'Tạo CV',
      href: '/editor',
      active: pathname === '/editor',
      primary: true
    },
    ...(session ? [{
      key: 'my-cvs',
      icon: <FolderOutlined className="text-lg" />,
      label: 'CV của tôi',
      href: '/my-cvs',
      active: pathname === '/my-cvs'
    }] : []),
    {
      key: 'profile',
      icon: <UserOutlined className="text-lg" />,
      label: session ? 'Tài khoản' : 'Đăng nhập',
      href: session ? '/profile' : '/auth/signin',
      active: pathname === '/profile' || pathname === '/auth/signin'
    }
  ];

  const handleNavClick = (href: string) => {
    if (href === '/#templates') {
      if (pathname === '/') {
        const element = document.querySelector('#templates');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push('/');
        setTimeout(() => {
          const element = document.querySelector('#templates');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <div className={`mobile-nav ${className}`}>
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.href)}
            className={`mobile-nav-item ${
              item.active ? 'active' : 'text-gray-500'
            } ${
              item.primary ? 'text-blue-600' : ''
            }`}
          >
            <div className={`mb-1 ${
              item.primary ? 'p-2 bg-blue-100 rounded-full' : ''
            }`}>
              {item.icon}
            </div>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;