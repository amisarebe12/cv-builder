'use client'

import { Progress, Typography, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Text } = Typography

interface PasswordStrengthIndicatorProps {
  password: string
  errors?: string[]
  strength?: 'weak' | 'medium' | 'strong'
}

export default function PasswordStrengthIndicator({ password, errors = [], strength }: PasswordStrengthIndicatorProps) {
  const requirements = [
    {
      label: 'Ít nhất 8 ký tự',
      test: (pwd: string) => pwd.length >= 8
    },
    {
      label: 'Có chữ cái viết hoa',
      test: (pwd: string) => /[A-Z]/.test(pwd)
    },
    {
      label: 'Có chữ cái viết thường',
      test: (pwd: string) => /[a-z]/.test(pwd)
    },
    {
      label: 'Có chữ số',
      test: (pwd: string) => /\d/.test(pwd)
    },
    {
      label: 'Có ký tự đặc biệt',
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    }
  ]

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak': return '#ff4d4f'
      case 'medium': return '#faad14'
      case 'strong': return '#52c41a'
      default: return '#d9d9d9'
    }
  }

  const getStrengthPercent = () => {
    switch (strength) {
      case 'weak': return 30
      case 'medium': return 70
      case 'strong': return 100
      default: return 0
    }
  }

  const getStrengthText = () => {
    switch (strength) {
      case 'weak': return 'Yếu'
      case 'medium': return 'Trung bình'
      case 'strong': return 'Mạnh'
      default: return 'Chưa đánh giá'
    }
  }

  if (!password) {
    return null
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex items-center justify-between">
          <Text strong>Độ mạnh mật khẩu:</Text>
          <Text 
            style={{ color: getStrengthColor() }}
            strong
          >
            {getStrengthText()}
          </Text>
        </div>
        
        <Progress
          percent={getStrengthPercent()}
          strokeColor={getStrengthColor()}
          showInfo={false}
          size="small"
        />
        
        <div className="mt-2">
          <Text className="text-sm text-gray-600 mb-2 block">Yêu cầu mật khẩu:</Text>
          <Space direction="vertical" size={2}>
            {requirements.map((req, index) => {
              const isValid = req.test(password)
              return (
                <div key={index} className="flex items-center gap-2">
                  {isValid ? (
                    <CheckCircleOutlined className="text-green-500 text-sm" />
                  ) : (
                    <CloseCircleOutlined className="text-red-500 text-sm" />
                  )}
                  <Text 
                    className={`text-sm ${
                      isValid ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {req.label}
                  </Text>
                </div>
              )
            })}
          </Space>
        </div>
        
        {errors.length > 0 && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <Text className="text-sm text-red-600 font-medium block mb-1">Lỗi:</Text>
            {errors.map((error, index) => (
              <Text key={index} className="text-sm text-red-600 block">
                • {error}
              </Text>
            ))}
          </div>
        )}
        
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
          <Text className="text-xs text-blue-600">
            💡 <strong>Mẹo:</strong> Sử dụng cụm từ dễ nhớ kết hợp với số và ký tự đặc biệt để tạo mật khẩu mạnh.
          </Text>
        </div>
      </Space>
    </div>
  )
}