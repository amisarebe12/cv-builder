'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Input, message, Card, Typography, Space, Divider, Alert } from 'antd'
import { MailOutlined, SafetyOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [countdown, setCountdown] = useState(0)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if this is a magic link verification
    const token = searchParams.get('token')
    const emailParam = searchParams.get('email')
    const messageParam = searchParams.get('message')
    const errorParam = searchParams.get('error')
    
    if (emailParam) {
      setEmail(emailParam)
    }
    
    if (messageParam === 'email_verified') {
      setVerified(true)
      message.success('Email đã được xác thực thành công!')
      setTimeout(() => {
        router.push('/auth/signin')
      }, 3000)
    }
    
    if (errorParam) {
      const errorMessages = {
        'missing_token': 'Thiếu token xác thực',
        'invalid_token': 'Token xác thực không hợp lệ',
        'user_not_found': 'Người dùng không tồn tại',
        'already_verified': 'Email đã được xác thực trước đó',
        'token_expired': 'Token đã hết hạn',
        'verification_failed': 'Xác thực thất bại'
      }
      message.error(errorMessages[errorParam as keyof typeof errorMessages] || 'Có lỗi xảy ra')
    }
  }, [searchParams, router])
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])
  
  const handleVerify = async () => {
    if (!email || !code) {
      message.error('Vui lòng nhập email và mã xác thực')
      return
    }
    
    if (code.length !== 6) {
      message.error('Mã xác thực phải có 6 chữ số')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setVerified(true)
        message.success(data.message)
        setTimeout(() => {
          router.push('/auth/signin')
        }, 3000)
      } else {
        message.error(data.error)
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi xác thực')
    } finally {
      setLoading(false)
    }
  }
  
  const handleResend = async () => {
    if (!email) {
      message.error('Vui lòng nhập email')
      return
    }
    
    setResendLoading(true)
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        message.success('Email xác thực đã được gửi lại')
        setCountdown(60) // 60 seconds cooldown
        setCode('') // Clear the code input
      } else {
        message.error(data.error)
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi lại email')
    } finally {
      setResendLoading(false)
    }
  }
  
  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
        <Card className="w-full max-w-md text-center">
          <div className="mb-6">
            <SafetyOutlined className="text-6xl text-green-500 mb-4" />
            <Title level={2} className="text-green-600">Xác thực thành công!</Title>
            <Paragraph className="text-gray-600">
              Email của bạn đã được xác thực. Bạn sẽ được chuyển hướng đến trang đăng nhập trong giây lát...
            </Paragraph>
          </div>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <MailOutlined className="text-4xl text-cyan-600 mb-4" />
          <Title level={2}>Xác thực Email</Title>
          <Paragraph className="text-gray-600">
            Chúng tôi đã gửi mã xác thực 6 chữ số đến email của bạn. Vui lòng nhập mã để hoàn tất đăng ký.
          </Paragraph>
        </div>
        
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong>Email:</Text>
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              prefix={<MailOutlined />}
            />
          </div>
          
          <div>
            <Text strong>Mã xác thực:</Text>
            <Input
              placeholder="Nhập mã 6 chữ số"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                setCode(value)
              }}
              size="large"
              maxLength={6}
              style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '18px' }}
            />
          </div>
          
          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleVerify}
            disabled={!email || code.length !== 6}
          >
            Xác thực Email
          </Button>
          
          <Divider>Hoặc</Divider>
          
          <Button
            type="default"
            size="large"
            block
            loading={resendLoading}
            onClick={handleResend}
            disabled={!email || countdown > 0}
            icon={<ReloadOutlined />}
          >
            {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã xác thực'}
          </Button>
          
          <Alert
            message="Lưu ý"
            description={
              <ul className="text-sm">
                <li>Mã xác thực có hiệu lực trong 5 phút</li>
                <li>Kiểm tra thư mục spam nếu không thấy email</li>
                <li>Bạn có thể gửi lại mã sau 1 phút</li>
              </ul>
            }
            type="info"
            showIcon
          />
          
          <div className="text-center space-y-2">
            <div>
              <Button type="link" onClick={() => router.push('/auth/resend-verification')}>
                Không nhận được email? Gửi lại mã xác thực
              </Button>
            </div>
            <div>
              <Button type="link" onClick={() => router.push('/auth/signin')}>
                Quay lại đăng nhập
              </Button>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  )
}