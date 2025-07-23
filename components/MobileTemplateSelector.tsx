'use client';

import React, { useState } from 'react';
import { Card, Button, Modal, Typography, Tag } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { TemplateInfo } from '../utils/CVFactory';

const { Title, Text } = Typography;

interface MobileTemplateSelectorProps {
  templates: TemplateInfo[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
  className?: string;
}

const MobileTemplateSelector: React.FC<MobileTemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelect,
  onPreview,
  className = ''
}) => {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateInfo | null>(null);

  const handlePreview = (template: TemplateInfo) => {
    setPreviewTemplate(template);
    setPreviewModalVisible(true);
    onPreview(template.id);
  };

  const handleSelectFromModal = (templateId: string) => {
    onSelect(templateId);
    setPreviewModalVisible(false);
  };

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className={`mobile-template-selector ${className}`}>
      {/* Category Filter */}
      <div className="mb-4">
        <div className="flex overflow-x-auto pb-2 gap-2">
          <Tag className="flex-shrink-0 px-3 py-1 cursor-pointer border-blue-500 text-blue-600">
            Tất cả
          </Tag>
          {categories.map(category => (
            <Tag 
              key={category}
              className="flex-shrink-0 px-3 py-1 cursor-pointer"
            >
              {category}
            </Tag>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="mobile-template-grid">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`mobile-template-card ${
              selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            bodyStyle={{ padding: 0 }}
          >
            {/* Template Preview */}
            <div className="mobile-template-preview relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg">
                {template.preview ? (
                  <img 
                    src={template.preview} 
                    alt={`Preview ${template.name}`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`fallback-placeholder absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex-col items-center justify-center ${template.preview ? 'hidden' : 'flex'}`}>
                  <div className="w-12 h-16 bg-white rounded shadow-sm mx-auto mb-2 flex items-center justify-center">
                    <div className="w-8 h-10 bg-gray-300 rounded"></div>
                  </div>
                  <Text className="text-xs text-gray-500 font-medium">{template.name}</Text>
                  <Text className="text-xs text-gray-400 mt-1">{template.category}</Text>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckOutlined className="text-white text-xs" />
                </div>
              )}
              
              {/* Preview Button */}
              <Button
                type="text"
                icon={<EyeOutlined />}
                className="absolute top-2 left-2 w-8 h-8 bg-white/80 hover:bg-white border-0 rounded-full flex items-center justify-center"
                onClick={() => handlePreview(template)}
              />
            </div>
            
            {/* Template Info */}
            <div className="p-2">
              <div className="flex items-center justify-between mb-1">
                <Title level={5} className="mb-0 text-xs font-medium truncate">
                  {template.name}
                </Title>
                <Tag color={template.category === 'Business' ? 'blue' : 'green'} className="text-xs ml-1">
                  {template.category}
                </Tag>
              </div>
              
              <Text className="text-xs text-gray-500 block mb-2 line-clamp-2">
                {template.description}
              </Text>
              
              <Button
                type={selectedTemplate === template.id ? 'primary' : 'default'}
                size="small"
                className="w-full mobile-button"
                onClick={() => onSelect(template.id)}
              >
                {selectedTemplate === template.id ? 'Đã chọn' : 'Chọn mẫu'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal
        title={previewTemplate?.name}
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        width="90%"
        style={{ top: 20 }}
        footer={[
          <Button key="cancel" onClick={() => setPreviewModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => previewTemplate && handleSelectFromModal(previewTemplate.id)}
          >
            Chọn mẫu này
          </Button>
        ]}
      >
        <div className="text-center py-4">
          <div className="w-full max-w-md mx-auto bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
              {previewTemplate?.preview ? (
                <img 
                  src={previewTemplate.preview} 
                  alt={`Preview ${previewTemplate.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="hidden absolute inset-0 bg-gray-50 flex items-center justify-center">
                <Text className="text-gray-400">Xem trước {previewTemplate?.name}</Text>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MobileTemplateSelector;