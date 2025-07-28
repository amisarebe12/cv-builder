'use client';

import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  MailOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { title: 'Tạo CV', href: '#' },
      { title: 'Mẫu CV', href: '#templates' },
      { title: 'Hướng dẫn', href: '#' }
    ],
    legal: [
      { title: 'Điều khoản sử dụng', href: '/terms' },
      { title: 'Chính sách bảo mật', href: '/privacy' }
    ]
  };

  // Social links removed

  return (
    <AntFooter className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <Row gutter={[32, 32]}>
            {/* Brand Section */}
            <Col xs={24} sm={12} lg={12}>
              <div className="mb-6">
                <Title level={3} className="text-white mb-4">
                  TopCV
                </Title>
                <Paragraph className="text-gray-300 mb-4">
                  Tạo CV chuyên nghiệp chỉ trong vài phút. 
                  Công cụ tạo CV trực tuyến miễn phí, dễ sử dụng và hiệu quả.
                </Paragraph>
                {/* Social links removed */}
              </div>
            </Col>

            {/* Product Links */}
            <Col xs={12} sm={6} lg={6}>
              <Title level={5} className="text-white mb-4">
                Sản phẩm
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                {footerLinks.product.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors block"
                  >
                    {link.title}
                  </Link>
                ))}
              </Space>
            </Col>

            {/* Contact Info */}
            <Col xs={12} sm={6} lg={6}>
              <Title level={5} className="text-white mb-4">
                Liên hệ
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MailOutlined />
                  <span>dhhoang.dn2@gmail.com</span>
                </div>
              </Space>
            </Col>
          </Row>
        </div>

        <Divider className="border-gray-700" />

        {/* Bottom Footer */}
        <div className="py-4">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={12}>
              <Paragraph className="text-gray-400 mb-0">
                © {currentYear} TopCV. Tất cả quyền được bảo lưu.
              </Paragraph>
            </Col>
            <Col xs={24} sm={12} className="text-right">
              <Space size="large" wrap>
                {footerLinks.legal.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                ))}
              </Space>
            </Col>
          </Row>
          
          {/* Made with AI */}
          <div className="text-center mt-4">
            <Paragraph className="text-gray-400 text-sm mb-0">
              Được tạo bởi AI 100%
            </Paragraph>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;