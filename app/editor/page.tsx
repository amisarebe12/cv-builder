'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout, message, Spin, Modal } from 'antd';
import { useSession } from 'next-auth/react';
import CVEditor from '../../components/CVEditor';
import { CVModel } from '../../models/CVModel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const EditorPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState<any>(null);
  
  // Lấy parameters từ URL
  const cvId = searchParams.get('cvId');
  const templateId = searchParams.get('templateId') || 'minimal';
  const mode = cvId ? 'edit' : 'create';

  useEffect(() => {
    if (mode === 'edit' && cvId && session) {
      const loadCV = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/cv/${cvId}`);
          if (response.ok) {
            const data = await response.json();
            setCvData(data.cv);
          } else {
            message.error('Không thể tải CV');
            router.push('/my-cvs');
          }
        } catch (error) {
          console.error('Lỗi khi tải CV:', error);
          message.error('Có lỗi xảy ra khi tải CV');
          router.push('/my-cvs');
        } finally {
          setLoading(false);
        }
      };
      
      loadCV();
    }
  }, [mode, cvId, session, router]);

  const handleSave = async (cvData: any, title: string) => {
    // Kiểm tra authentication cho việc lưu CV
    if (!session) {
      Modal.confirm({
        title: 'Cần đăng nhập để lưu CV',
        content: 'Bạn cần đăng nhập để có thể lưu CV. Bạn có muốn đăng nhập ngay bây giờ?',
        okText: 'Đăng nhập',
        cancelText: 'Hủy',
        onOk: () => {
          router.push('/auth/signin');
        }
      });
      return;
    }

    try {
      setLoading(true);
      
      const saveData = {
        title: title || 'CV không có tiêu đề',
        template: templateId,
        cvData: cvData,
        isPublic: false
      };

      if (mode === 'create') {
        const response = await fetch('/api/cv/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(saveData),
        });

        if (response.ok) {
          const result = await response.json();
          message.success('Lưu CV thành công!');
          router.push(`/editor?cvId=${result.cvId}`);
        } else {
          const error = await response.json();
          message.error(error.message || 'Có lỗi xảy ra khi lưu CV');
        }
      } else if (cvId) {
        const response = await fetch(`/api/cv/${cvId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(saveData),
        });

        if (response.ok) {
          message.success('Lưu CV thành công!');
        } else {
          const error = await response.json();
          message.error(error.message || 'Có lỗi xảy ra khi cập nhật CV');
        }
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

  if (status === 'loading' || loading) {
    return (
      <Layout className="min-h-screen bg-gray-50">
        <Header />
        <Content>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Spin size="large" />
              <div className="mt-4">Đang tải...</div>
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header />
      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          <CVEditor
            cvId={cvId || undefined}
            templateId={templateId}
            initialData={cvData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default EditorPage;