'use client';

import React, { useState, useMemo } from 'react';
import { Input, Select, Row, Col, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TemplateInfo } from '../utils/CVFactory';
import CVCard from './CVCard';

interface TemplateSelectorProps {
  templates: TemplateInfo[];
  selectedTemplateId?: string;
  onPreview: (templateId: string) => void;
  onSelect: (templateId: string) => void;
  className?: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplateId,
  onPreview,
  onSelect,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lấy danh sách categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(templates.map(t => t.category)));
    return [
      { value: 'all', label: 'Tất cả' },
      ...uniqueCategories.map(cat => ({
        value: cat,
        label: cat === 'Professional' ? 'Chuyên nghiệp' :
               cat === 'Creative' ? 'Sáng tạo' :
               cat === 'Traditional' ? 'Truyền thống' : cat
      }))
    ];
  }, [templates]);

  // Lọc templates theo search term và category
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = searchTerm === '' || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchTerm, selectedCategory]);

  return (
    <div className={`template-selector ${className}`}>
      {/* Search and Filter Controls */}
      <div className="mb-10 bg-gray-50 p-6 rounded-xl shadow-sm">
        <Row gutter={[24, 20]} align="middle">
          <Col xs={24} sm={16} md={18}>
            <Input
              placeholder="Tìm kiếm mẫu CV..."
              prefix={<SearchOutlined className="text-gray-400 text-lg" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
              className="rounded-lg shadow-md"
              style={{ height: '50px' }}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              size="large"
              className="w-full rounded-lg shadow-md"
              placeholder="Chọn danh mục"
              style={{ height: '50px' }}
              dropdownStyle={{ borderRadius: '8px' }}
            />
          </Col>
        </Row>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <Row gutter={[24, 24]} className="items-stretch justify-center">
          {filteredTemplates.map((template) => (
            <Col key={template.id} xs={24} sm={12} md={8} lg={6} xl={6} className="flex justify-center">
              <CVCard
                template={template}
                onPreview={onPreview}
                onSelect={onSelect}
                isSelected={selectedTemplateId === template.id}
                className="h-full flex flex-col"
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-16 px-8 bg-gray-50 rounded-xl shadow-md">
          <Empty
            description={
              <div className="mt-6">
                <p className="text-gray-700 text-xl font-medium mb-4">Không tìm thấy mẫu CV nào</p>
                <p className="text-base text-gray-500 max-w-md mx-auto">
                  Thử thay đổi từ khóa tìm kiếm hoặc danh mục để tìm mẫu CV phù hợp
                </p>
              </div>
            }
          />
        </div>
      )}

      {/* Results Summary */}
      {filteredTemplates.length > 0 && (
        <div className="mt-8 text-center bg-gray-50 py-5 px-8 rounded-xl shadow-md">
          <p className="text-base text-gray-700">
            Hiển thị <span className="font-semibold">{filteredTemplates.length}</span> trong tổng số <span className="font-semibold">{templates.length}</span> mẫu CV
            {searchTerm && (
              <span className="ml-1">
                cho từ khóa <span className="font-semibold">"{searchTerm}"</span>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="ml-1">
                trong danh mục <span className="font-semibold">"{categories.find(c => c.value === selectedCategory)?.label}"</span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;