'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout, message, Spin } from 'antd';
import CVEditor from '../../components/CVEditor';
import { CVModel } from '../../models/CVModel';
import { CVService } from '../../services/CVService';

const { Content } = Layout;

const EditorPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  // Lấy parameters từ URL
  const cvId = searchParams.get('cvId');
  const templateId = searchParams.get('templateId') || 'minimal';
  const mode = searchParams.get('mode') || 'create'; // 'create' hoặc 'edit'

  useEffect(() => {
    // Kiểm tra nếu đang ở chế độ edit nhưng không có cvId
    if (mode === 'edit' && !cvId) {
      message.error('Không tìm thấy ID của CV để chỉnh sửa');
      router.push('/');
      return;
    }
    
    // Nếu đang ở chế độ edit, lấy templateId từ CV
    if (mode === 'edit' && cvId) {
      const loadCVTemplate = async () => {
        try {
          setLoading(true);
          const cvService = CVService.getInstance();
          const cv = await cvService.getCVById(cvId);
          if (cv) {
            const data = cv.toJSON();
            if (data.templateId) {
              // Cập nhật templateId từ dữ liệu CV
              const params = new URLSearchParams(window.location.search);
              params.set('templateId', data.templateId);
              router.replace(`/editor?${params.toString()}`);
            }
          }
        } catch (error) {
          console.error('Lỗi khi tải thông tin template CV:', error);
        } finally {
          setLoading(false);
        }
      };
      
      loadCVTemplate();
    }
  }, [mode, cvId, router]);

  const handleSave = async (cvData: CVModel) => {
    try {
      setLoading(true);
      
      if (mode === 'create') {
        message.success('Tạo CV mới thành công!');
        // Chuyển hướng đến trang chỉnh sửa với CV vừa tạo
        router.push(`/editor?mode=edit&cvId=${cvData.getId()}&templateId=${templateId}`);
      } else {
        message.success('Cập nhật CV thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi lưu CV:', error);
      message.error('Có lỗi xảy ra khi lưu CV');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spin size="large" />
          <div className="mt-4">Đang xử lý...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          <CVEditor
            cvId={cvId || undefined}
            templateId={templateId}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default EditorPage;