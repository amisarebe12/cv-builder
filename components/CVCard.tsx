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
      className={`cv-card group transition-all duration-500 hover:shadow-2xl cursor-pointer rounded-2xl overflow-hidden border-0 ${
        isSelected ? 'ring-4 ring-blue-500 shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      } ${className}`}
      style={{ width: '280px', background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)' }}
      cover={
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-t-2xl" style={{ aspectRatio: '3/4', height: '360px', minHeight: '360px' }}>
          {/* Template Preview Placeholder */}
          <div className="absolute inset-0 p-4">
            <div className="h-full flex flex-col">
              {/* Header Section */}
              <div className={`h-18 rounded-xl mb-4 flex items-center justify-start px-4 shadow-lg ${
                template.category === 'Professional' ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700' :
                template.category === 'Creative' ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600' :
                template.id === 'tech' ? 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600' :
                template.id === 'legal' ? 'bg-gradient-to-r from-slate-700 via-blue-800 to-blue-900' :
                template.id === 'finance' ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700' :
                template.id === 'construction' ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600' :
                'bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
                    <span className="text-white font-bold text-xl">
                      {template.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-bold tracking-wide">Nguyễn Văn A</div>
                    <div className="text-xs opacity-90 font-medium">Senior Developer</div>
                  </div>
                </div>
              </div>
              
              {/* Content Sections */}
              <div className="flex-1 space-y-4">
                {/* Section 1 - Experience */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <div className="h-2.5 bg-blue-600 rounded w-20 mr-2"></div>
                    <div className="flex-grow"></div>
                    <div className="h-1.5 bg-blue-300 rounded w-10"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-2 bg-blue-300 rounded w-1/3 mr-2"></div>
                      <div className="h-1.5 bg-blue-200 rounded-full px-2 w-14"></div>
                    </div>
                    <div className="h-1.5 bg-blue-200 rounded w-28"></div>
                    <div className="h-1.5 bg-blue-200 rounded w-full"></div>
                    <div className="h-1.5 bg-blue-200 rounded w-4/5"></div>
                  </div>
                </div>
                
                {/* Section 2 - Education */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <div className="h-2.5 bg-green-600 rounded w-16 mr-2"></div>
                    <div className="flex-grow"></div>
                    <div className="h-1.5 bg-green-300 rounded w-10"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-2 bg-green-300 rounded w-1/3 mr-2"></div>
                      <div className="h-1.5 bg-green-200 rounded-full px-2 w-14"></div>
                    </div>
                    <div className="h-1.5 bg-green-200 rounded w-28"></div>
                    <div className="h-1.5 bg-green-200 rounded w-full"></div>
                    <div className="h-1.5 bg-green-200 rounded w-3/5"></div>
                  </div>
                </div>
                
                {/* Section 3 - Skills */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <div className="h-2.5 bg-purple-600 rounded w-12"></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-14"></div>
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-16"></div>
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-12"></div>
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-15"></div>
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-10"></div>
                    <div className="h-5 bg-purple-200 rounded-full px-2 py-1 w-8"></div>
                  </div>
                </div>
                
                {/* Section 4 - Contact */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <div className="h-2.5 bg-orange-600 rounded w-14"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-300 mr-2"></div>
                      <div className="h-1.5 bg-orange-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-300 mr-2"></div>
                      <div className="h-1.5 bg-orange-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-300 mr-2"></div>
                      <div className="h-1.5 bg-orange-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template Name Badge */}
              <div className="absolute bottom-3 right-3 z-10">
                <div className="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-xl w-[100px] text-center truncate border border-gray-700">
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

          {/* Template Badges - Removed featured and new properties as they don't exist in TemplateInfo */}

          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-3 right-3 z-10">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckOutlined className="text-white text-base" />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
            <div className="flex flex-col space-y-4 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
              <Button
                type="primary"
                icon={<EyeOutlined className="text-lg" />}
                onClick={handlePreview}
                className="bg-white/95 text-gray-800 border-white hover:bg-white hover:scale-105 shadow-2xl px-8 py-4 h-auto font-semibold text-base w-[150px] flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                size="large"
              >
                Xem trước
              </Button>
              <Button
                type="primary"
                onClick={handleSelect}
                className="bg-blue-600/95 text-white border-blue-600 hover:bg-blue-700 hover:scale-105 shadow-2xl px-8 py-4 h-auto font-semibold text-base w-[150px] flex items-center justify-center backdrop-blur-sm transition-all duration-200"
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
          className="w-full h-auto py-3 flex items-center justify-center font-medium text-base h-[50px] rounded-bl-xl shadow-md hover:shadow-lg transition-all duration-300"
          size="large"
        >
          Xem trước
        </Button>,
        <Button
          key="select"
          type={isSelected ? "default" : "primary"}
          icon={isSelected ? <CheckOutlined className="text-lg" /> : undefined}
          onClick={handleSelect}
          className={`w-full h-auto py-3 flex items-center justify-center font-medium text-base h-[50px] rounded-br-xl shadow-md hover:shadow-lg transition-all duration-300 ${
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