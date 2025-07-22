'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Layout,
  Card,
  Button,
  Row,
  Col,
  Space,
  Typography,
  message,
  Modal,
  Input,
  Spin,
  Empty,
  Tag,
  Dropdown,
  Tooltip
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  DownloadOutlined,
  PrinterOutlined,
  MoreOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;

interface SavedCV {
  _id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  cvData?: any;
}

function MyCVsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cvs, setCvs] = useState<SavedCV[]>([]);
  const [filteredCvs, setFilteredCvs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/my-cvs');
      return;
    }

    if (status === 'authenticated') {
      fetchMyCVs();
    }
  }, [status, router]);

  useEffect(() => {
    // Lọc CV theo từ khóa tìm kiếm
    if (searchText.trim() === '') {
      setFilteredCvs(cvs);
    } else {
      const filtered = cvs.filter(cv => 
        cv.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCvs(filtered);
    }
  }, [searchText, cvs]);

  const fetchMyCVs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cv/my-cvs');
      const data = await response.json();

      if (response.ok) {
        setCvs(data.cvs);
      } else {
        message.error(data.error || 'Không thể tải danh sách CV');
      }
    } catch (error) {
      console.error('Error fetching CVs:', error);
      message.error('Có lỗi xảy ra khi tải danh sách CV');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCV = (cvId: string, title: string) => {
    confirm({
      title: 'Xác nhận xóa CV',
      content: `Bạn có chắc chắn muốn xóa CV "${title}"? Hành động này không thể hoàn tác.`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const response = await fetch(`/api/cv/${cvId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            message.success('Xóa CV thành công');
            fetchMyCVs(); // Refresh the list
          } else {
            const data = await response.json();
            message.error(data.error || 'Không thể xóa CV');
          }
        } catch (error) {
          console.error('Error deleting CV:', error);
          message.error('Có lỗi xảy ra khi xóa CV');
        }
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTemplateDisplayName = (template: string) => {
    const templateNames: { [key: string]: string } = {
      'modern': 'Modern',
      'classic': 'Classic',
      'creative': 'Creative',
      'minimal': 'Minimal',
      'business': 'Business',
      'tech': 'Technology',
      'medical': 'Medical',
      'education': 'Education',
      'finance': 'Finance',
      'marketing': 'Marketing',
      'legal': 'Legal',
      'hospitality': 'Hospitality',
      'retail': 'Retail',
      'construction': 'Construction',
      'agriculture': 'Agriculture',
      'creative2': 'Creative Pro'
    };
    return templateNames[template] || template;
  };

  if (status === 'loading') {
    return (
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex items-center justify-center">
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header />
      <Content className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Title level={2} className="mb-2">
                  CV của tôi
                </Title>
                <Text className="text-gray-600">
                  Quản lý và chỉnh sửa các CV đã lưu của bạn
                </Text>
              </div>
              <Button 
                type="primary" 
                size="large"
                icon={<PlusOutlined />}
                onClick={() => router.push('/editor')}
                className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
              >
                Tạo CV mới
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Search
              placeholder="Tìm kiếm CV theo tên..."
              allowClear
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
            />
          </div>

          {/* CVs Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Spin size="large" />
            </div>
          ) : filteredCvs.length === 0 ? (
            <Card className="text-center py-12">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <Text className="text-gray-500 text-lg mb-4 block">
                      {searchText ? 'Không tìm thấy CV nào' : 'Bạn chưa có CV nào được lưu'}
                    </Text>
                    {!searchText && (
                      <Button 
                        type="primary" 
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => router.push('/editor')}
                        className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                      >
                        Tạo CV đầu tiên
                      </Button>
                    )}
                  </div>
                }
              />
            </Card>
          ) : (
            <Row gutter={[24, 24]}>
              {filteredCvs.map((cv) => (
                <Col key={cv._id} xs={24} sm={12} lg={8} xl={6}>
                  <Card
                    hoverable
                    className="h-full shadow-sm border-0"
                    cover={
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <FileTextOutlined className="text-4xl text-blue-500" />
                      </div>
                    }
                    actions={[
                      <Tooltip title="Xem CV" key="view">
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />}
                          onClick={() => router.push(`/editor?cvId=${cv._id}`)}
                        />
                      </Tooltip>,
                      <Tooltip title="Chỉnh sửa" key="edit">
                        <Button 
                          type="text" 
                          icon={<EditOutlined />}
                          onClick={() => router.push(`/editor?cvId=${cv._id}`)}
                        />
                      </Tooltip>,
                      <Tooltip title="Xóa" key="delete">
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => handleDeleteCV(cv._id, cv.title)}
                        />
                      </Tooltip>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className="truncate">
                          {cv.title}
                        </div>
                      }
                      description={
                        <Space direction="vertical" size="small" className="w-full">
                          <Tag color="blue">
                            {getTemplateDisplayName(cv.template)}
                          </Tag>
                          <div className="flex items-center text-gray-500 text-xs">
                            <CalendarOutlined className="mr-1" />
                            {formatDate(cv.updatedAt)}
                          </div>
                          {cv.isPublic && (
                            <Tag color="green">
                              Công khai
                            </Tag>
                          )}
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MyCVsPage;