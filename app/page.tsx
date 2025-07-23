'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Typography, Button, Spin, message, Space, Tag } from 'antd';
import { EyeOutlined, RocketOutlined, StarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CVCard from '../components/CVCard';
import PreviewModal from '../components/PreviewModal';
import TemplateSelector from '../components/TemplateSelector';
import MobileTemplateSelector from '../components/MobileTemplateSelector';
import SelectedTemplateInfo from '../components/SelectedTemplateInfo';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useDeviceType from '../hooks/useDeviceType';
import { CVModel } from '../models/CVModel';
import { CVService } from '../services/CVService';
import { getAllTemplates, TemplateInfo } from '../utils/CVFactory';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [cvData, setCvData] = useState<CVModel | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTemplateId, setPreviewTemplateId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet } = useDeviceType();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      
      // Lấy danh sách templates
      const templateList = getAllTemplates();
      setTemplates(templateList);
      
      // Lấy dữ liệu CV mẫu
      const cvService = CVService.getInstance();
      const cvList = await cvService.getAllCVs();
      if (cvList.length > 0) {
        setCvData(cvList[0]);
      }
      
      // Set template mặc định
      if (templateList.length > 0) {
        setSelectedTemplate(templateList[0].id);
      }
    } catch (error) {
      console.error('Lỗi khi khởi tạo dữ liệu:', error);
      message.error('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (templateId: string) => {
    if (!cvData) {
      message.warning('Chưa có dữ liệu CV để xem trước.');
      return;
    }
    setPreviewTemplateId(templateId);
    setPreviewVisible(true);
  };

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    message.success(`Đã chọn mẫu ${templates.find(t => t.id === templateId)?.name}`);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPreviewTemplateId('');
  };

  const handleSelectFromPreview = (templateId: string) => {
    setSelectedTemplate(templateId);
    setPreviewVisible(false);
  };

  const handleStartEditing = () => {
    if (!selectedTemplate) {
      message.warning('Vui lòng chọn một mẫu CV trước.');
      return;
    }
    // TODO: Chuyển đến trang chỉnh sửa CV
    message.info('Chức năng chỉnh sửa CV sẽ được triển khai trong phiên bản tiếp theo.');
  };

  const features = [
    {
      icon: <RocketOutlined className="text-2xl text-blue-600" />,
      title: 'Tạo CV nhanh chóng',
      description: 'Chỉ cần vài phút để tạo ra một CV chuyên nghiệp'
    },
    {
      icon: <StarOutlined className="text-2xl text-purple-600" />,
      title: 'Thiết kế đẹp mắt',
      description: 'Nhiều mẫu CV hiện đại, phù hợp với mọi ngành nghề'
    },
    {
      icon: <CheckCircleOutlined className="text-2xl text-green-600" />,
      title: 'Dễ dàng tùy chỉnh',
      description: 'Thay đổi thông tin và thiết kế theo ý muốn'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
            </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Title level={1} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Tạo <span className="text-gradient">CV Online</span> 
              <br />Chuyên Nghiệp
            </Title>
            <Paragraph className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Với CV Builder, bạn có thể tạo ra những bản CV ấn tượng chỉ trong vài phút. 
              Chọn từ nhiều mẫu thiết kế đẹp mắt và tùy chỉnh theo phong cách riêng của bạn.
            </Paragraph>
            <Space size="large" className="mb-12">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="h-12 px-8 text-lg font-medium"
                onClick={() => router.push('/editor?mode=create')}
              >
                Bắt đầu tạo CV
              </Button>
              <Button 
                size="large" 
                icon={<EyeOutlined />}
                className="h-12 px-8 text-lg"
                onClick={() => router.push('/my-cvs')}
              >
                Quản lý CV
              </Button>
            </Space>
            
            {/* Không hiển thị phần thống kê */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn CV Builder?
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp những công cụ tốt nhất để bạn tạo ra CV hoàn hảo
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]} className="mb-16">
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <Title level={4} className="mb-3">{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Đã bỏ phần Stats Section */}

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-3xl font-bold text-gray-900 mb-4">
              Chọn mẫu CV yêu thích
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập mẫu CV đa dạng, phù hợp với mọi ngành nghề và phong cách
            </Paragraph>
          </div>
          
          {isMobile ? (
            <MobileTemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onPreview={handlePreview}
              onSelect={handleSelect}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Template Selector */}
              <div className="lg:col-span-2">
                <TemplateSelector
                  templates={templates}
                  selectedTemplateId={selectedTemplate}
                  onPreview={handlePreview}
                  onSelect={handleSelect}
                />
              </div>
              
              {/* Selected Template Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <SelectedTemplateInfo
                    template={templates.find(t => t.id === selectedTemplate) || null}
                    onPreview={() => selectedTemplate && handlePreview(selectedTemplate)}
                    onStartEditing={handleStartEditing}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Title level={2} className="text-3xl font-bold text-white mb-4">
            Sẵn sàng tạo CV của bạn?
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-8">
            Hãy bắt đầu ngay hôm nay và tạo ra bản CV ấn tượng để chinh phục nhà tuyển dụng
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            className="h-12 px-8 text-lg font-medium bg-white text-blue-600 border-white hover:bg-gray-100"
            onClick={() => selectedTemplate ? router.push(`/editor?mode=create&templateId=${selectedTemplate}`) : message.warning('Vui lòng chọn một mẫu CV trước.')}
          >
            Tạo CV miễn phí ngay
          </Button>
        </div>
      </section>

      {/* Preview Modal */}
      {cvData && (
        <PreviewModal
          visible={previewVisible}
          onClose={handleClosePreview}
          templateId={previewTemplateId}
          cvData={cvData}
          onSelect={handleSelectFromPreview}
          key={`preview-${previewTemplateId}-${Date.now()}`}
        />
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;