'use client';

import React from 'react';
import { Card, Button, Space, Typography, Tag } from 'antd';
import { EyeOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { TemplateInfo } from '../utils/CVFactory';

const { Title, Paragraph } = Typography;

interface SelectedTemplateInfoProps {
  template: TemplateInfo | null;
  onPreview: () => void;
  onStartEditing: () => void;
  className?: string;
}

const SelectedTemplateInfo: React.FC<SelectedTemplateInfoProps> = ({
  template,
  onPreview,
  onStartEditing,
  className = ''
}) => {
  if (!template) {
    return (
      <Card className={`text-center ${className}`}>
        <div className="py-8">
          <div className="text-gray-400 mb-4">
            <CheckCircleOutlined className="text-4xl" />
          </div>
          <Title level={4} className="text-gray-500 mb-2">
            Chưa chọn mẫu CV
          </Title>
          <Paragraph className="text-gray-400">
            Hãy chọn một mẫu CV từ danh sách bên trên để bắt đầu
          </Paragraph>
        </div>
      </Card>
    );
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Professional':
        return 'blue';
      case 'Creative':
        return 'purple';
      case 'Traditional':
        return 'green';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'Professional':
        return 'Chuyên nghiệp';
      case 'Creative':
        return 'Sáng tạo';
      case 'Traditional':
        return 'Truyền thống';
      default:
        return category;
    }
  };

  return (
    <Card 
      className={`selected-template-info ${className}`}
      styles={{
        body: { padding: '24px' }
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <CheckCircleOutlined className="text-white text-xl" />
          </div>
          <div>
            <Title level={4} className="mb-1">
              Mẫu đã chọn: {template.name}
            </Title>
            <Tag color={getCategoryColor(template.category)}>
              {getCategoryLabel(template.category)}
            </Tag>
          </div>
        </div>
      </div>
      
      <Paragraph className="text-gray-600 mb-6">
        {template.description}
      </Paragraph>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircleOutlined className="text-green-600" />
          <span className="text-green-800 font-medium">Mẫu CV đã được chọn</span>
        </div>
        <p className="text-green-700 text-sm mb-0">
          Bạn có thể xem trước hoặc bắt đầu chỉnh sửa CV với mẫu này
        </p>
      </div>
      
      <Space size="middle" className="w-full" direction="vertical">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            type="default"
            icon={<EyeOutlined />}
            onClick={onPreview}
            size="large"
            className="flex-1"
          >
            Xem trước mẫu
          </Button>
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => window.location.href = `/editor?mode=create&templateId=${template.id}`}
            size="large"
            className="flex-1 bg-green-500 border-green-500 hover:bg-green-600"
          >
            Bắt đầu tạo CV
          </Button>
        </div>
        
        <div className="text-center">
          <Paragraph className="text-sm text-gray-500 mb-0">
            💡 Mẹo: Bạn có thể thay đổi mẫu bất cứ lúc nào trong quá trình chỉnh sửa
          </Paragraph>
        </div>
      </Space>
    </Card>
  );
};

export default SelectedTemplateInfo;