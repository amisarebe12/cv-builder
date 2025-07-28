'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Modal, Button, Avatar, Space, Typography } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  FolderOutlined,
  UserOutlined,
  PlusOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';

const { Text } = Typography;

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userModalVisible, setUserModalVisible] = useState(false);

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
      href: '#profile',
      active: false
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
    } else if (href === '#profile') {
      if (session) {
        setUserModalVisible(true);
      } else {
        signIn();
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
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
              style={{ touchAction: 'manipulation' }}
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

      {/* User Account Modal */}
      <Modal
        title="Tài khoản của tôi"
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={null}
        centered
      >
        {session && (
          <div className="text-center py-4">
            <Avatar 
              src={session.user?.image} 
              icon={<UserOutlined />}
              size={64}
              className="mb-4"
            />
            <Text strong className="block text-lg mb-2">
              {session.user?.name || 'Người dùng'}
            </Text>
            <Text className="block text-gray-500 mb-6">
              {session.user?.email}
            </Text>
            
            <Space direction="vertical" className="w-full" size="middle">
              <Button 
                type="default" 
                icon={<FolderOutlined />}
                block
                onClick={() => {
                  setUserModalVisible(false);
                  router.push('/my-cvs');
                }}
              >
                CV của tôi
              </Button>
              
              <Button 
                type="default" 
                icon={<LogoutOutlined />}
                block
                onClick={() => {
                  setUserModalVisible(false);
                  signOut();
                }}
              >
                Đăng xuất
              </Button>
            </Space>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MobileNavigation;