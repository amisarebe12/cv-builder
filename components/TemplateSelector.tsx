'use client';

import React, { useState, useMemo } from 'react';
import { Input, Select, Row, Col, Empty, Badge } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
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
      {/* Modern Search and Filter Controls */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Input */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Input
                  placeholder="Tìm kiếm mẫu CV theo tên hoặc mô tả..."
                  prefix={<SearchOutlined className="text-gray-400 text-xl" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="large"
                  className="rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  style={{ height: '56px', fontSize: '16px' }}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full lg:w-80">
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
                size="large"
                className="w-full"
                placeholder="Chọn danh mục"
                style={{ height: '56px' }}
                suffixIcon={<FilterOutlined className="text-gray-400" />}
                dropdownStyle={{ borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              />
            </div>
            
            {/* Results Count Badge */}
            <div className="flex items-center">
              <Badge 
                count={filteredTemplates.length} 
                showZero 
                style={{ 
                  backgroundColor: '#3b82f6',
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '28px',
                  height: '28px',
                  lineHeight: '28px'
                }}
              />
              <span className="ml-2 text-gray-600 font-medium">mẫu CV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 justify-items-center">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="flex justify-center">
              <CVCard
                template={template}
                onPreview={onPreview}
                onSelect={onSelect}
                isSelected={selectedTemplateId === template.id}
                className="w-full max-w-sm transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchOutlined className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Không tìm thấy mẫu CV nào</h3>
            <p className="text-gray-500 mb-6">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để tìm mẫu CV phù hợp
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Results Summary */}
      {filteredTemplates.length > 0 && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white rounded-full shadow-md border border-gray-100 px-6 py-3">
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">
                Hiển thị <span className="font-bold text-blue-600">{filteredTemplates.length}</span> / <span className="font-semibold">{templates.length}</span> mẫu CV
              </span>
              {searchTerm && (
                <span className="text-gray-500">
                  • Từ khóa: <span className="font-medium text-gray-700">"{searchTerm}"</span>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="text-gray-500">
                  • Danh mục: <span className="font-medium text-gray-700">{categories.find(c => c.value === selectedCategory)?.label}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;