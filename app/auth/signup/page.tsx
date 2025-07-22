'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Input, Card, Typography, message, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const { Title, Text } = Typography;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSignUp = async (values: SignUpFormData) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        router.push('/auth/signin');
      } else {
        message.error(data.error || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Có lỗi xảy ra khi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleFacebookSignUp = () => {
    signIn('facebook', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="shadow-lg border-0">
            <div className="text-center mb-8">
              <Title level={2} className="mb-2">
                Đăng ký tài khoản
              </Title>
              <Text className="text-gray-600">
                Tạo tài khoản để bắt đầu tạo CV chuyên nghiệp
              </Text>
            </div>

            <Form
              form={form}
              name="signup"
              onFinish={handleSignUp}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                  { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Nhập họ và tên"
                />
              </Form.Item>

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
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>

            <Divider>Hoặc đăng ký với</Divider>

            <Space direction="vertical" className="w-full" size="middle">
              <Button
                icon={<GoogleOutlined />}
                onClick={handleGoogleSignUp}
                className="w-full border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
              >
                Đăng ký với Google
              </Button>
              <Button
                icon={<FacebookOutlined />}
                onClick={handleFacebookSignUp}
                className="w-full border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
              >
                Đăng ký với Facebook
              </Button>
            </Space>

            <div className="text-center mt-6">
              <Text className="text-gray-600">
                Đã có tài khoản?{' '}
                <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">
                  Đăng nhập ngay
                </Link>
              </Text>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}