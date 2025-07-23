'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Layout, Menu, Button, Drawer, Typography, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  FolderOutlined,
  LoginOutlined
} from '@ant-design/icons';
import useDeviceType from '../hooks/useDeviceType';
import MobileNavigation from './MobileNavigation';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { isMobile, isTablet } = useDeviceType();
  
  // Don't render header on mobile portrait, use MobileNavigation instead
  // But show header on tablet and mobile landscape
  if (isMobile && window.innerHeight > window.innerWidth) {
    return <MobileNavigation />;
  }

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      href: '/'
    },
    {
      key: 'templates',
      icon: <FileTextOutlined />,
      label: 'Mẫu CV',
      href: '#templates'
    },
    ...(session ? [{
      key: 'my-cvs',
      icon: <FolderOutlined />,
      label: 'CV của tôi',
      href: '/my-cvs'
    }] : [])
  ];

  const handleMenuClick = (href: string) => {
    if (href === '/') {
      router.push('/');
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
    setMobileMenuVisible(false);
  };

  const userMenuItems = [
    {
      key: 'my-cvs',
      icon: <FolderOutlined />,
      label: 'CV của tôi',
      onClick: () => router.push('/my-cvs')
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: () => signOut()
    }
  ];

  return (
    <AntHeader className={`bg-white shadow-sm sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileTextOutlined className="text-white text-lg" />
            </div>
            <Title level={4} className="mb-0 text-gray-900">
              CV Builder
            </Title>
          </div>

          {/* Desktop/Tablet Menu */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
            <nav className="flex items-center space-x-4 lg:space-x-8">
              {menuItems.map((item) => (
                <a 
                  key={item.key}
                  href={item.href} 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                >
                  {item.icon}
                  <span className="ml-1 lg:ml-2 hidden md:inline">{item.label}</span>
                </a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {session ? (
                <>
                  <Button 
                    type="primary"
                    size={isTablet ? "small" : "middle"}
                    onClick={() => router.push('/editor')}
                    className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                  >
                    <span className="hidden md:inline">Tạo CV ngay</span>
                    <span className="md:hidden">Tạo CV</span>
                  </Button>
                  <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                    <Space className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                      <Avatar 
                        src={session.user?.image} 
                        icon={<UserOutlined />}
                        size="small"
                      />
                      <span className="text-gray-700 font-medium hidden lg:inline">
                        {session.user?.name}
                      </span>
                    </Space>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button 
                    type="default"
                    size={isTablet ? "small" : "middle"}
                    icon={<LoginOutlined />}
                    onClick={() => signIn()}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <span className="hidden md:inline">Đăng nhập</span>
                  </Button>
                  <Button 
                    type="primary"
                    size={isTablet ? "small" : "middle"}
                    onClick={() => router.push('/editor')}
                    className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                  >
                    <span className="hidden md:inline">Tạo CV ngay</span>
                    <span className="md:hidden">Tạo CV</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button 
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              className="text-gray-600 hover:text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <FileTextOutlined className="text-white text-sm" />
            </div>
            <span>CV Builder</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
        className="md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <div className="flex-1">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.href);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Action Button */}
          <div className="border-t pt-4 mt-4 space-y-3">
            {session ? (
              <>
                <Button 
                  type="primary"
                  block
                  size="large"
                  onClick={() => {
                    router.push('/editor');
                    setMobileMenuVisible(false);
                  }}
                  className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                >
                  Tạo CV ngay
                </Button>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={session.user?.image} 
                      icon={<UserOutlined />}
                      size="small"
                    />
                    <span className="text-gray-700 font-medium">
                      {session.user?.name}
                    </span>
                  </div>
                  <Button 
                    type="text"
                    size="small"
                    icon={<LogoutOutlined />}
                    onClick={() => signOut()}
                    className="text-gray-500 hover:text-red-500"
                  />
                </div>
              </>
            ) : (
              <>
                <Button 
                  type="default"
                  block
                  size="large"
                  icon={<LoginOutlined />}
                  onClick={() => {
                    signIn();
                    setMobileMenuVisible(false);
                  }}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 mb-2"
                >
                  Đăng nhập
                </Button>
                <Button 
                  type="primary"
                  block
                  size="large"
                  onClick={() => {
                    router.push('/editor');
                    setMobileMenuVisible(false);
                  }}
                  className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                >
                  Tạo CV ngay
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Footer */}
          <div className="border-t pt-4 mt-4 text-center">
            <p className="text-gray-500 text-sm mb-1">
              © 2024 CV Builder
            </p>
            <p className="text-gray-400 text-xs mb-0">
              Tạo CV chuyên nghiệp miễn phí
            </p>
          </div>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default Header;