'use client';

import React from 'react';
import { Card, Button } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { TemplateInfo } from '../utils/CVFactory';

interface CVCardProps {
  template: TemplateInfo;
  onPreview: (templateId: string) => void;
  onSelect: (templateId: string) => void;
  isSelected?: boolean;
  className?: string;
}

const CVCard: React.FC<CVCardProps> = ({
  template,
  onPreview,
  onSelect,
  isSelected = false,
  className = ''
}) => {
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(template.id);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(template.id);
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Professional':
        return 'bg-blue-100 text-blue-800';
      case 'Creative':
        return 'bg-purple-100 text-purple-800';
      case 'Traditional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      className={`cv-card transition-all duration-300 hover:shadow-xl cursor-pointer rounded-lg overflow-hidden ${
        isSelected ? 'ring-3 ring-blue-500 shadow-lg' : ''
      } ${className}`}
      style={{ width: '240px' }}
      cover={
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-t-lg" style={{ aspectRatio: '3/4', height: '320px', minHeight: '320px' }}>
          {/* Template Preview Placeholder */}
          <div className="absolute inset-0 p-4">
            <div className="h-full flex flex-col">
              {/* Header Section */}
              <div className={`h-16 rounded-md mb-4 flex items-center justify-start px-4 ${
                template.category === 'Professional' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                template.category === 'Creative' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                template.id === 'tech' ? 'bg-gradient-to-r from-sky-600 to-sky-700' :
                template.id === 'legal' ? 'bg-gradient-to-r from-blue-800 to-blue-900' :
                template.id === 'finance' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' :
                template.id === 'construction' ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                'bg-gradient-to-r from-gray-700 to-gray-800'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {template.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-semibold">Tên đầy đủ</div>
                    <div className="text-xs opacity-90">Chức danh</div>
                  </div>
                </div>
              </div>
              
              {/* Content Sections */}
              <div className="flex-1 space-y-3">
                {/* Section 1 - Experience */}
                <div className="bg-gray-50 rounded-md p-3 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="h-3 bg-gray-300 rounded w-28 mr-2"></div>
                    <div className="flex-grow"></div>
                    <div className="h-2 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="h-2 bg-gray-200 rounded w-1/3 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-32"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                  </div>
                </div>
                
                {/* Section 2 - Education */}
                <div className="bg-gray-50 rounded-md p-3 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="h-3 bg-gray-300 rounded w-20 mr-2"></div>
                    <div className="flex-grow"></div>
                    <div className="h-2 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="h-2 bg-gray-200 rounded w-1/3 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-32"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                  </div>
                </div>
                
                {/* Section 3 - Skills */}
                <div className="bg-gray-50 rounded-md p-3 shadow-sm">
                  <div className="h-3 bg-gray-300 rounded mb-3 w-16"></div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-14"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-18"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-12"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-10"></div>
                  </div>
                </div>
                
                {/* Section 4 - Contact */}
                <div className="bg-gray-50 rounded-md p-3 shadow-sm">
                  <div className="h-3 bg-gray-300 rounded mb-2 w-16"></div>
                  <div className="space-y-1.5">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template Name Badge */}
              <div className="absolute bottom-3 right-3 z-10">
                <div className="bg-black bg-opacity-90 text-white px-4 py-2 rounded-md text-xs font-medium shadow-md w-[90px] text-center truncate">
                  {template.name}
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-4 py-2.5 rounded-full text-sm font-medium shadow-md flex items-center justify-center w-[110px] h-[36px] text-center ${getCategoryColor(template.category)}`}>
              {getCategoryLabel(template.category)}
            </span>
          </div>

          {/* Template Badges */}
          <div className="absolute top-2 right-2 flex space-x-1.5">
            {template.featured && (
              <div className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                Hot
              </div>
            )}
            {template.new && (
              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                New
              </div>
            )}
          </div>

          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckOutlined className="text-white text-base" />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 z-20">
            <div className="flex flex-col space-y-3">
              <Button
                type="primary"
                icon={<EyeOutlined className="text-lg" />}
                onClick={handlePreview}
                className="bg-white text-gray-800 border-white hover:bg-gray-100 shadow-xl px-6 py-3 h-auto font-medium text-base w-[140px] flex items-center justify-center"
                size="large"
              >
                Xem trước
              </Button>
              <Button
                type="primary"
                onClick={handleSelect}
                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-xl px-6 py-3 h-auto font-medium text-base w-[140px] flex items-center justify-center"
                size="large"
              >
                Chọn mẫu
              </Button>
            </div>
          </div>
        </div>
      }
      actions={[
        <Button
          key="preview"
          type="default"
          icon={<EyeOutlined className="text-lg" />}
          onClick={handlePreview}
          className="w-full h-auto py-3 flex items-center justify-center font-medium text-base h-[50px]"
          size="large"
        >
          Xem trước
        </Button>,
        <Button
          key="select"
          type={isSelected ? "default" : "primary"}
          icon={isSelected ? <CheckOutlined className="text-lg" /> : undefined}
          onClick={handleSelect}
          className={`w-full h-auto py-3 flex items-center justify-center font-medium text-base h-[50px] ${
            isSelected 
              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:text-white' 
              : ''
          }`}
          size="large"
        >
          {isSelected ? 'Đã chọn' : 'Chọn mẫu'}
        </Button>
      ]}
      onClick={() => onPreview(template.id)}
    >
      <Card.Meta
        title={
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-gray-800 truncate pr-2">
              {template.name}
            </span>
            {isSelected && (
              <CheckOutlined className="text-green-500 text-xl flex-shrink-0" />
            )}
          </div>
        }
        description={
          <div>
            <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">{template.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className={`px-4 py-2.5 rounded-full text-sm font-medium shadow-md flex items-center justify-center w-[110px] h-[36px] text-center ${getCategoryColor(template.category)}`}>
                {getCategoryLabel(template.category)}
              </span>
              <span className="text-gray-500 font-mono text-xs flex-shrink-0">ID: {template.id}</span>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default CVCard;