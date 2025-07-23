'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, DatePicker, Select, Upload, Avatar, message } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  BookOutlined,
  ToolOutlined,
  ProjectOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { CVData } from '../models/CVModel';

const { TextArea } = Input;
const { Option } = Select;

interface MobileCVEditorProps {
  cvId?: string;
  templateId?: string;
  initialData?: any;
  onSave: (cvData: any, title?: string) => Promise<void>;
  onCancel: () => void;
}

interface TabConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MobileCVEditor: React.FC<MobileCVEditorProps> = ({
  cvId,
  templateId,
  initialData,
  onSave,
  onCancel
}) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);

  const tabs: TabConfig[] = [
    {
      key: 'personal',
      label: 'Cá nhân',
      icon: <UserOutlined />,
      color: 'bg-blue-500'
    },
    {
      key: 'experience',
      label: 'Kinh nghiệm',
      icon: <BankOutlined />,
      color: 'bg-green-500'
    },
    {
      key: 'education',
      label: 'Học vấn',
      icon: <BookOutlined />,
      color: 'bg-purple-500'
    },
    {
      key: 'skills',
      label: 'Kỹ năng',
      icon: <ToolOutlined />,
      color: 'bg-orange-500'
    },
    {
      key: 'projects',
      label: 'Dự án',
      icon: <ProjectOutlined />,
      color: 'bg-red-500'
    }
  ];

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const updatedData = { ...formData, ...values };
      const title = updatedData.personalInfo?.fullName || 'CV không có tiêu đề';
      await onSave(updatedData, title);
      message.success('Lưu CV thành công!');
    } catch (error) {
      message.error('Vui lòng kiểm tra lại thông tin');
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="mobile-form-section">
      <h3>Thông tin cá nhân</h3>
      
      {/* Avatar Upload */}
      <div className="text-center mb-4">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
        >
          <Avatar size={80} icon={<UserOutlined />} />
        </Upload>
        <Button type="link" size="small" icon={<UploadOutlined />}>
          Tải ảnh lên
        </Button>
      </div>

      <Space direction="vertical" className="w-full" size="middle">
        <Form.Item name={['personalInfo', 'fullName']} rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
          <Input placeholder="Họ và tên" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'title']}>
          <Input placeholder="Chức danh / Vị trí mong muốn" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'email']} rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
          <Input placeholder="Email" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'phone']}>
          <Input placeholder="Số điện thoại" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'address']}>
          <Input placeholder="Địa chỉ" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'website']}>
          <Input placeholder="Website" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name={['personalInfo', 'linkedin']}>
          <Input placeholder="LinkedIn" className="mobile-input" />
        </Form.Item>
        
        <Form.Item name="summary">
          <TextArea 
            placeholder="Mô tả bản thân (tóm tắt)" 
            className="mobile-textarea"
            rows={4}
          />
        </Form.Item>
      </Space>
    </div>
  );

  const renderExperience = () => (
    <div className="mobile-form-section">
      <h3>Kinh nghiệm làm việc</h3>
      <p className="text-sm text-gray-600 mb-4">Thêm kinh nghiệm làm việc của bạn</p>
      
      <Button 
        type="dashed" 
        icon={<PlusOutlined />} 
        className="w-full mobile-button mb-4"
      >
        Thêm kinh nghiệm
      </Button>
      
      {/* Experience items would be rendered here */}
      <div className="space-y-4">
        <Card size="small" className="border-l-4 border-l-green-500">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">Vị trí công việc</h4>
              <p className="text-sm text-gray-600">Tên công ty</p>
              <p className="text-xs text-gray-500">01/2023 - Hiện tại</p>
            </div>
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </div>
          <p className="text-sm">Mô tả công việc...</p>
        </Card>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="mobile-form-section">
      <h3>Học vấn</h3>
      <p className="text-sm text-gray-600 mb-4">Thêm thông tin học vấn</p>
      
      <Button 
        type="dashed" 
        icon={<PlusOutlined />} 
        className="w-full mobile-button mb-4"
      >
        Thêm học vấn
      </Button>
    </div>
  );

  const renderSkills = () => (
    <div className="mobile-form-section">
      <h3>Kỹ năng</h3>
      <p className="text-sm text-gray-600 mb-4">Thêm kỹ năng của bạn</p>
      
      <Button 
        type="dashed" 
        icon={<PlusOutlined />} 
        className="w-full mobile-button mb-4"
      >
        Thêm kỹ năng
      </Button>
    </div>
  );

  const renderProjects = () => (
    <div className="mobile-form-section">
      <h3>Dự án</h3>
      <p className="text-sm text-gray-600 mb-4">Thêm dự án đã thực hiện</p>
      
      <Button 
        type="dashed" 
        icon={<PlusOutlined />} 
        className="w-full mobile-button mb-4"
      >
        Thêm dự án
      </Button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="mobile-content">
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onValuesChange={(_, allValues) => setFormData({ ...formData, ...allValues })}
      >
        {/* Mobile Tabs */}
        <div className="mobile-editor-tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`mobile-tab ${
                activeTab === tab.key ? 'active' : ''
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Action Buttons */}
        <div className="fixed bottom-16 left-4 right-4 bg-white border-t border-gray-200 p-4 z-30">
          <Space direction="vertical" className="w-full" size="middle">
            <Button
              type="default"
              className="w-full mobile-button"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              className="w-full mobile-button"
              loading={loading}
              onClick={handleSave}
            >
              Lưu CV
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default MobileCVEditor;