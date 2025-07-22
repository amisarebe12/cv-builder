'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  DownloadOutlined, 
  StarOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { CVService } from '../services/CVService';

const { Title, Paragraph } = Typography;

interface StatsData {
  totalUsers: number;
  totalCVs: number;
  totalDownloads: number;
  averageRating: number;
  templatesCount: number;
  avgCreationTime: number;
}

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalCVs: 0,
    totalDownloads: 0,
    averageRating: 0,
    templatesCount: 0,
    avgCreationTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const cvService = CVService.getInstance();
        const cvStats = await cvService.getStatistics();
        
        // Mô phỏng dữ liệu thống kê
        setStats({
          totalUsers: 1250,
          totalCVs: cvStats.totalCVs || 3,
          totalDownloads: 2840,
          averageRating: 4.8,
          templatesCount: 3,
          avgCreationTime: 5 // phút
        });
      } catch (error) {
        console.error('Lỗi khi tải thống kê:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statsItems = [
    {
      title: 'Người dùng',
      value: stats.totalUsers,
      suffix: '+',
      icon: <UserOutlined className="text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'CV đã tạo',
      value: stats.totalCVs,
      suffix: '+',
      icon: <FileTextOutlined className="text-green-500" />,
      color: 'green'
    },
    {
      title: 'Lượt tải xuống',
      value: stats.totalDownloads,
      suffix: '+',
      icon: <DownloadOutlined className="text-purple-500" />,
      color: 'purple'
    },
    {
      title: 'Đánh giá',
      value: stats.averageRating,
      suffix: '/5 ⭐',
      precision: 1,
      icon: <StarOutlined className="text-yellow-500" />,
      color: 'yellow'
    },
    {
      title: 'Mẫu CV',
      value: stats.templatesCount,
      suffix: ' mẫu',
      icon: <TrophyOutlined className="text-red-500" />,
      color: 'red'
    },
    {
      title: 'Thời gian tạo',
      value: stats.avgCreationTime,
      suffix: ' phút',
      icon: <ClockCircleOutlined className="text-indigo-500" />,
      color: 'indigo'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title level={2} className="text-3xl font-bold text-gray-900 mb-4">
            Thống kê ấn tượng
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn người đã tin tưởng và sử dụng CV Builder để tạo ra những bản CV xuất sắc
          </Paragraph>
        </div>
        
        <Row gutter={[24, 24]}>
          {statsItems.map((item, index) => (
            <Col xs={12} sm={8} lg={4} key={index}>
              <Card 
                className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-gray-50 to-white"
                styles={{
                  body: { padding: '24px 16px' }
                }}
              >
                <Space direction="vertical" size="small" className="w-full">
                  <div className="text-3xl mb-2">
                    {item.icon}
                  </div>
                  {loading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Statistic
                      value={item.value}
                      suffix={item.suffix}
                      precision={item.precision || 0}
                      valueStyle={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}
                    />
                  )}
                  <div className="text-sm text-gray-600 font-medium">
                    {item.title}
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <Title level={3} className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Tham gia cộng đồng CV Builder ngay hôm nay!
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-0">
              Hơn <strong>{stats.totalUsers.toLocaleString()}</strong> người đã tạo CV thành công. 
              Bạn sẽ là người tiếp theo?
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;