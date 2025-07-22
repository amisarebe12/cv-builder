'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Button, Drawer, Typography } from 'antd';
import { 
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const router = useRouter();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

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
    }
  ];

  const handleMenuClick = (href: string) => {
    if (href === '/') {
      router.push('/');
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuVisible(false);
  };

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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick('/');
                }}
              >
                <HomeOutlined className="mr-2" />
                Trang chủ
              </a>
              <a 
                href="#templates" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick('#templates');
                }}
              >
                <FileTextOutlined className="mr-2" />
                Mẫu CV
              </a>
            </nav>
            
            <Button 
              type="primary"
              size="middle"
              className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
            >
              Tạo CV ngay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
          <div className="border-t pt-4 mt-4">
            <Button 
              type="primary"
              block
              size="large"
              className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
            >
              Tạo CV ngay
            </Button>
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