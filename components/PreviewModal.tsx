'use client';

import React, { Suspense, useState } from 'react';
import { Modal, Button, Spin, message, Dropdown } from 'antd';
import { DownloadOutlined, PrinterOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { CVModel } from '../models/CVModel';
import { getTemplateComponent, getTemplateInfo } from '../utils/CVFactory';
import { CVService } from '../services/CVService';

interface PreviewModalProps {
  visible: boolean;
  onClose: () => void;
  templateId: string;
  cvData: CVModel;
  onSelect?: (templateId: string) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  visible,
  onClose,
  templateId,
  cvData,
  onSelect
}) => {
  const [loading, setLoading] = useState(false);
  const templateInfo = getTemplateInfo(templateId);
  const TemplateComponent = getTemplateComponent(templateId);
  const cvService = CVService.getInstance();

  const handlePrint = async () => {
    try {
      setLoading(true);
      await cvService.printCV(cvData.getId(), templateId);
      message.success('Đã gửi lệnh in CV');
    } catch (error) {
      message.error('Không thể in CV. Vui lòng thử lại.');
      console.error('Print error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: 'pdf' | 'html' = 'pdf') => {
    try {
      setLoading(true);
      await cvService.downloadCV(cvData.getId(), templateId, format);
      message.success(`Đã tải xuống CV dưới dạng ${format.toUpperCase()}`);
    } catch (error) {
      message.error('Không thể tải xuống CV. Vui lòng thử lại.');
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(templateId);
      message.success(`Đã chọn mẫu ${templateInfo?.name}`);
    }
  };

  if (!templateInfo || !TemplateComponent) {
    return (
      <Modal
        title="Lỗi"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            Đóng
          </Button>
        ]}
      >
        <div className="text-center py-8">
          <p className="text-red-500">Không tìm thấy mẫu CV với ID: {templateId}</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">Xem trước: {templateInfo.name}</span>
            <p className="text-sm text-gray-500 mt-1">{templateInfo.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              templateInfo.category === 'Professional' ? 'bg-blue-100 text-blue-800' :
              templateInfo.category === 'Creative' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {templateInfo.category === 'Professional' ? 'Chuyên nghiệp' :
               templateInfo.category === 'Creative' ? 'Sáng tạo' : 'Truyền thống'}
            </span>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width="90vw"
      style={{ maxWidth: '1200px' }}
      styles={{
        body: { 
          padding: 0, 
          maxHeight: '80vh', 
          overflow: 'auto',
          backgroundColor: '#f5f5f5'
        }
      }}
      footer={[
        <div key="footer" className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              icon={<PrinterOutlined />}
              onClick={handlePrint}
              loading={loading}
              className="flex items-center"
            >
              In CV
            </Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'pdf',
                    label: 'Tải xuống PDF',
                    icon: <DownloadOutlined />,
                    onClick: () => handleDownload('pdf')
                  },
                  {
                    key: 'html',
                    label: 'Tải xuống HTML',
                    icon: <DownloadOutlined />,
                    onClick: () => handleDownload('html')
                  }
                ]
              }}
              trigger={['click']}
            >
              <Button
                icon={<DownloadOutlined />}
                loading={loading}
                className="flex items-center"
              >
                Tải xuống <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="flex items-center gap-2">
            {onSelect && (
              <Button
                type="primary"
                onClick={handleSelect}
                className="bg-green-500 border-green-500 hover:bg-green-600"
              >
                Chọn mẫu này
              </Button>
            )}
            <Button
              icon={<CloseOutlined />}
              onClick={onClose}
            >
              Đóng
            </Button>
          </div>
        </div>
      ]}
      closeIcon={null}
    >
      <div className="cv-preview-content bg-white">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                  <Spin size="large" />
                  <p className="mt-4 text-gray-600">Đang tải mẫu CV...</p>
                </div>
            </div>
          }
        >
          {/* Sử dụng key để đảm bảo component được re-render khi templateId thay đổi */}
          <TemplateComponent 
            key={`template-${templateId}-${Date.now()}`}
            cvData={cvData} 
            isPreview={true}
            className="shadow-none"
          />
        </Suspense>
      </div>
    </Modal>
  );
};

export default PreviewModal;