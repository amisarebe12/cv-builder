'use client';

import React, { useState, useEffect } from 'react';
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
  Dropdown
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
  ArrowLeftOutlined
} from '@ant-design/icons';
import { CVModel } from '../../models/CVModel';
import { CVService } from '../../services/CVService';
import PreviewModal from '../../components/PreviewModal';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;

interface CVCardProps {
  cv: CVModel;
  onEdit: (cvId: string) => void;
  onDelete: (cvId: string) => void;
  onPreview: (cv: CVModel) => void;
  onDuplicate: (cvId: string) => void;
}

const CVCard: React.FC<CVCardProps> = ({ cv, onEdit, onDelete, onPreview, onDuplicate }) => {
  const cvData = cv.toJSON();
  // Sử dụng thời gian hiện tại nếu không có lastModified trong dữ liệu
  const lastModified = cvData.lastModified ? new Date(cvData.lastModified) : new Date();
  
  const menuItems = [
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
      onClick: () => onEdit(cv.getId())
    },
    {
      key: 'duplicate',
      label: 'Nhân bản',
      icon: <CopyOutlined />,
      onClick: () => onDuplicate(cv.getId())
    },
    {
      key: 'download',
      label: 'Tải xuống',
      icon: <DownloadOutlined />,
      onClick: async () => {
        try {
          const cvService = CVService.getInstance();
          await cvService.downloadCV(cv.getId(), 'minimal', 'pdf');
          message.success('Tải xuống thành công!');
        } catch (error) {
          message.error('Không thể tải xuống CV');
        }
      }
    },
    {
      key: 'print',
      label: 'In',
      icon: <PrinterOutlined />,
      onClick: async () => {
        try {
          const cvService = CVService.getInstance();
          await cvService.printCV(cv.getId(), 'minimal');
        } catch (error) {
          message.error('Không thể in CV');
        }
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => onDelete(cv.getId())
    }
  ];

  return (
    <Card
      className="h-full hover:shadow-lg transition-shadow duration-200"
      cover={
        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-md">
              <span className="text-2xl font-bold text-blue-600">
                {cvData.personalInfo.fullName?.charAt(0) || 'CV'}
              </span>
            </div>
            <Text className="text-gray-600 font-medium">
              {cvData.personalInfo.title || 'Chưa có chức danh'}
            </Text>
          </div>
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => onPreview(cv)}
          />
        </div>
      }
      actions={[
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(cv.getId())}
        >
          Chỉnh sửa
        </Button>,
        <Dropdown
          key="more"
          menu={{ items: menuItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />}>
            Thêm
          </Button>
        </Dropdown>
      ]}
    >
      <Card.Meta
        title={
          <div className="flex items-center justify-between">
            <span className="truncate">
              {cvData.personalInfo.fullName || 'CV chưa có tên'}
            </span>
            <Tag color="blue">Minimal</Tag>
          </div>
        }
        description={
          <div>
            <Text type="secondary" className="block truncate mb-1">
              {cvData.personalInfo.email || 'Chưa có email'}
            </Text>
            <Text type="secondary" className="text-xs">
              Cập nhật {formatDistanceToNow(lastModified, { addSuffix: true, locale: vi })}
            </Text>
          </div>
        }
      />
    </Card>
  );
};

const MyCVsPage: React.FC = () => {
  const router = useRouter();
  const [cvs, setCvs] = useState<CVModel[]>([]);
  const [filteredCvs, setFilteredCvs] = useState<CVModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [previewCV, setPreviewCV] = useState<CVModel | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    loadCVs();
  }, []);

  useEffect(() => {
    // Lọc CV theo từ khóa tìm kiếm
    if (searchText.trim() === '') {
      setFilteredCvs(cvs);
    } else {
      const filtered = cvs.filter(cv => {
        const data = cv.toJSON();
        const searchLower = searchText.toLowerCase();
        return (
          data.personalInfo.fullName?.toLowerCase().includes(searchLower) ||
          data.personalInfo.email?.toLowerCase().includes(searchLower) ||
          data.personalInfo.title?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredCvs(filtered);
    }
  }, [searchText, cvs]);

  const loadCVs = async () => {
    try {
      setLoading(true);
      const cvService = CVService.getInstance();
      const allCVs = await cvService.getAllCVs();
      setCvs(allCVs);
      setFilteredCvs(allCVs);
    } catch (error) {
      console.error('Lỗi khi tải danh sách CV:', error);
      message.error('Không thể tải danh sách CV');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/editor?mode=create');
  };

  const handleEdit = (cvId: string) => {
    router.push(`/editor?mode=edit&cvId=${cvId}`);
  };

  const handleDelete = (cvId: string) => {
    const cv = cvs.find(c => c.getId() === cvId);
    const cvData = cv?.toJSON();
    
    confirm({
      title: 'Xác nhận xóa CV',
      content: `Bạn có chắc chắn muốn xóa CV "${cvData?.personalInfo.fullName || 'Không có tên'}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const cvService = CVService.getInstance();
          await cvService.deleteCV(cvId);
          message.success('Xóa CV thành công!');
          loadCVs(); // Tải lại danh sách
        } catch (error) {
          console.error('Lỗi khi xóa CV:', error);
          message.error('Không thể xóa CV');
        }
      }
    });
  };

  const handlePreview = (cv: CVModel) => {
    setPreviewCV(cv);
    setPreviewVisible(true);
  };

  const handleDuplicate = async (cvId: string) => {
    try {
      const cvService = CVService.getInstance();
      const originalCV = await cvService.getCVById(cvId);
      
      if (originalCV) {
        const originalData = originalCV.toJSON();
        const duplicatedData = {
          ...originalData,
          id: `cv-${Date.now()}`,
          personalInfo: {
            ...originalData.personalInfo,
            fullName: `${originalData.personalInfo.fullName} (Bản sao)`
          }
        };
        
        await cvService.createCV(duplicatedData);
        message.success('Nhân bản CV thành công!');
        loadCVs();
      }
    } catch (error) {
      console.error('Lỗi khi nhân bản CV:', error);
      message.error('Không thể nhân bản CV');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spin size="large" />
          <div className="mt-4">Đang tải danh sách CV...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button 
                  icon={<ArrowLeftOutlined />}
                  onClick={handleGoBack}
                  className="flex items-center"
                >
                  Quay lại
                </Button>
                <Title level={2} className="!mb-0">
                  Quản lý CV của tôi
                </Title>
              </div>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                size="large"
                onClick={handleCreateNew}
                className="bg-blue-600 border-blue-600 hover:bg-blue-700"
              >
                Tạo CV mới
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <Text type="secondary">
                Tổng cộng {filteredCvs.length} CV
              </Text>
              
              <Search
                placeholder="Tìm kiếm CV theo tên, email hoặc chức danh..."
                allowClear
                style={{ width: 400 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* CV Grid */}
          {filteredCvs.length === 0 ? (
            <div className="text-center py-16">
              <Empty
                description={
                  searchText ? 'Không tìm thấy CV nào phù hợp' : 'Chưa có CV nào'
                }
              >
                {!searchText && (
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleCreateNew}
                    className="bg-blue-600 border-blue-600 hover:bg-blue-700"
                  >
                    Tạo CV đầu tiên
                  </Button>
                )}
              </Empty>
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {filteredCvs.map(cv => (
                <Col key={cv.getId()} xs={24} sm={12} lg={8} xl={6}>
                  <CVCard
                    cv={cv}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPreview={handlePreview}
                    onDuplicate={handleDuplicate}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>

      {/* Preview Modal */}
      {previewCV && (
        <PreviewModal
          visible={previewVisible}
          onClose={() => {
            setPreviewVisible(false);
            setPreviewCV(null);
          }}
          templateId={previewCV.toJSON().templateId || 'minimal'}
          cvData={previewCV}
          key={`preview-${previewCV.getId()}-${Date.now()}`}
        />
      )}
    </Layout>
  );
};

export default MyCVsPage;