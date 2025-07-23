'use client'

import React from 'react'
import { signIn, getProviders, useSession } from 'next-auth/react'
import { Card, Button, Typography, Space, Divider, Form, Input, message, Alert } from 'antd'
import { GoogleOutlined, FacebookOutlined, UserOutlined, MailOutlined, LockOutlined, WarningOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const { Title, Text } = Typography

interface Provider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [credentialsLoading, setCredentialsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [form] = Form.useForm()
  const { data: session, status } = useSession()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl)
    }
  }, [status, router, callbackUrl])

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    setLoading(providerId)
    try {
      await signIn(providerId, { callbackUrl })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(null)
    }
  }

  const handleCredentialsSignIn = async (values: { email: string; password: string }) => {
    setCredentialsLoading(true)
    try {
      console.log('Attempting sign in with callbackUrl:', callbackUrl)
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      console.log('Sign in result:', result)

      if (result?.error) {
        // Handle specific error types
        if (result.error.includes('Account locked')) {
          const lockTimeMatch = result.error.match(/until (.+)$/)
          const lockTime = lockTimeMatch ? lockTimeMatch[1] : 'một thời gian'
          message.error({
            content: (
              <div>
                <WarningOutlined className="text-red-500 mr-2" />
                <strong>Tài khoản bị khóa</strong>
                <br />
                <span className="text-sm">Tài khoản của bạn đã bị khóa do đăng nhập sai quá nhiều lần.</span>
                <br />
                <span className="text-sm">Thời gian mở khóa: {lockTime}</span>
              </div>
            ),
            duration: 8,
          })
        } else if (result.error.includes('Email not verified')) {
          message.error({
            content: (
              <div>
                <MailOutlined className="text-orange-500 mr-2" />
                <strong>Email chưa được xác thực</strong>
                <br />
                <span className="text-sm">Vui lòng kiểm tra email và xác thực tài khoản trước khi đăng nhập.</span>
                <br />
                <Button 
                  type="link" 
                  size="small" 
                  className="p-0 h-auto text-blue-600"
                  onClick={() => router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}`)}
                >
                  Đi đến trang xác thực →
                </Button>
              </div>
            ),
            duration: 10,
          })
        } else if (result.error.includes('Invalid credentials')) {
          message.error('Email hoặc mật khẩu không đúng')
        } else {
          message.error(result.error || 'Có lỗi xảy ra khi đăng nhập')
        }
      } else if (result?.ok) {
        message.success('Đăng nhập thành công!')
        // Use router.push for better navigation
        router.push(callbackUrl)
      } else {
        message.error('Có lỗi xảy ra khi đăng nhập')
      }
    } catch (error) {
      console.error('Credentials sign in error:', error)
      message.error('Có lỗi xảy ra khi đăng nhập')
    } finally {
      setCredentialsLoading(false)
    }
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return <GoogleOutlined style={{ fontSize: '20px' }} />
      case 'facebook':
        return <FacebookOutlined style={{ fontSize: '20px' }} />
      default:
        return <UserOutlined style={{ fontSize: '20px' }} />
    }
  }

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return '#db4437'
      case 'facebook':
        return '#4267B2'
      default:
        return '#1890ff'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card 
          className="w-full max-w-md shadow-lg border-0"
          style={{ borderRadius: '16px' }}
        >
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-white text-2xl" />
            </div>
          </div>
          <Title level={2} className="mb-2 text-gray-800">
            Đăng nhập
          </Title>
          <Text className="text-gray-600">
            Đăng nhập để lưu và quản lý CV của bạn
          </Text>
        </div>

        <Form
          form={form}
          name="signin"
          onFinish={handleCredentialsSignIn}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={credentialsLoading}
              className="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Divider>Hoặc đăng nhập với</Divider>

        <Space direction="vertical" size="middle" className="w-full">
          {providers && Object.values(providers).map((provider) => {
            if (provider.id === 'google' || provider.id === 'facebook') {
              return (
                <Button
                  key={provider.id}
                  type="default"
                  size="large"
                  icon={getProviderIcon(provider.id)}
                  loading={loading === provider.id}
                  onClick={() => handleSignIn(provider.id)}
                  className="w-full border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
                >
                  Đăng nhập với {provider.name}
                </Button>
              )
            }
            return null
          })}
        </Space>

        <div className="text-center mt-6 space-y-2">
          <div>
            <Text className="text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700">
                Đăng ký ngay
              </Link>
            </Text>
          </div>
          <div>
            <Text className="text-gray-600">
              Cần xác thực email?{' '}
              <Link href="/auth/resend-verification" className="text-blue-600 hover:text-blue-700">
                Gửi lại mã xác thực
              </Link>
            </Text>
          </div>
        </div>

        <Divider className="my-4" />

        <div className="text-center">
          <Button 
            type="link" 
            onClick={() => router.push(callbackUrl)}
            className="text-gray-600 hover:text-blue-600"
          >
            Tiếp tục mà không đăng nhập
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Text className="text-xs text-gray-500">
            Bằng cách đăng nhập, bạn đồng ý với{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Chính sách bảo mật
            </a>{' '}
            của chúng tôi.
          </Text>
        </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}