'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography, Progress, Tooltip } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { ImageCleanupService } from '../services/ImageCleanupService';

const { Text } = Typography;

interface ImageStorageInfoProps {
  className?: string;
}

const ImageStorageInfo: React.FC<ImageStorageInfoProps> = ({ className }) => {
  const [storageInfo, setStorageInfo] = useState({
    count: 0,
    totalSize: 0,
    images: []
  });
  const [loading, setLoading] = useState(false);

  const cleanupService = ImageCleanupService.getInstance();

  const updateStorageInfo = () => {
    const info = cleanupService.getStorageUsage();
    setStorageInfo(info);
  };

  useEffect(() => {
    updateStorageInfo();
    
    // Update every 30 seconds
    const interval = setInterval(updateStorageInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCleanup = async () => {
    setLoading(true);
    try {
      cleanupService.cleanup();
      updateStorageInfo();
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    setLoading(true);
    try {
      cleanupService.clearAll();
      updateStorageInfo();
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStoragePercentage = (): number => {
    const maxSize = 50 * 1024 * 1024; // 50MB limit
    return Math.min((storageInfo.totalSize / maxSize) * 100, 100);
  };

  const getProgressStatus = (): 'normal' | 'active' | 'exception' => {
    const percentage = getStoragePercentage();
    if (percentage > 80) return 'exception';
    if (percentage > 60) return 'active';
    return 'normal';
  };

  if (storageInfo.count === 0) {
    return null; // Don't show if no images
  }

  return (
    <Card 
      size="small" 
      className={`${className} border-gray-200`}
      title={
        <Space>
          <InfoCircleOutlined className="text-blue-500" />
          <Text strong>Bộ nhớ ảnh</Text>
        </Space>
      }
      extra={
        <Space>
          <Tooltip title="Làm mới thông tin">
            <Button 
              type="text" 
              size="small" 
              icon={<ReloadOutlined />}
              onClick={updateStorageInfo}
            />
          </Tooltip>
        </Space>
      }
    >
      <Space direction="vertical" className="w-full">
        <div>
          <Text type="secondary">Đã sử dụng: </Text>
          <Text strong>{formatSize(storageInfo.totalSize)}</Text>
          <Text type="secondary"> ({storageInfo.count} ảnh)</Text>
        </div>
        
        <Progress 
          percent={getStoragePercentage()} 
          status={getProgressStatus()}
          size="small"
          showInfo={false}
        />
        
        <Space>
          <Button 
            size="small" 
            onClick={handleCleanup}
            loading={loading}
            disabled={storageInfo.count === 0}
          >
            Dọn dẹp tự động
          </Button>
          
          <Button 
            size="small" 
            danger
            icon={<DeleteOutlined />}
            onClick={handleClearAll}
            loading={loading}
            disabled={storageInfo.count === 0}
          >
            Xóa tất cả
          </Button>
        </Space>
        
        <Text type="secondary" className="text-xs">
          Ảnh sẽ tự động xóa sau 24 giờ
        </Text>
      </Space>
    </Card>
  );
};

export default ImageStorageInfo;