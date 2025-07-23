'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Input, Card, Typography, message, Divider, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

const { Title, Text } = Typography;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const [form] = Form.useForm();

  // Validate password strength in real-time
  useEffect(() => {
    if (password) {
      validatePasswordStrength(password);
    } else {
      setPasswordValidation(null);
    }
  }, [password]);

  const validatePasswordStrength = async (pwd: string) => {
    // Client-side validation to match server-side logic
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    const errors = [];
    
    if (pwd.length < minLength) {
      errors.push(`Mật khẩu phải có ít nhất ${minLength} ký tự`);
    }
    if (!hasUpperCase) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết hoa');
    }
    if (!hasLowerCase) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ cái viết thường');
    }
    if (!hasNumbers) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ số');
    }
    if (!hasSpecialChar) {
      errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
    }
    
    // Calculate strength
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (hasLowerCase) score += 1;
    if (hasUpperCase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChar) score += 1;
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) score += 1;
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(pwd)) score += 1;
    
    let strength: 'weak' | 'medium' | 'strong';
    if (score <= 3) strength = 'weak';
    else if (score <= 6) strength = 'medium';
    else strength = 'strong';
    
    setPasswordValidation({
      isValid: errors.length === 0,
      errors,
      strength
    });
  };

  const handleSignUp = async (values: SignUpFormData) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (passwordValidation && !passwordValidation.isValid) {
      message.error('Vui lòng tạo mật khẩu đủ mạnh theo yêu cầu');
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
        setSignupSuccess(true);
        setUserEmail(values.email);
        message.success(data.message);
        // Don't redirect immediately, show verification message
      } else {
        if (data.details && data.details.length > 0) {
          message.error({
            content: (
              <div>
                <div>{data.error}</div>
                <ul style={{ margin: '8px 0 0 16px' }}>
                  {data.details.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ),
            duration: 6
          });
        } else {
          message.error(data.error || 'Đăng ký thất bại');
        }
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

  const handleGoToVerification = () => {
    router.push(`/auth/verify-email?email=${encodeURIComponent(userEmail)}`);
  };

  // Show success message after signup
  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <Card className="shadow-lg border-0 text-center">
              <div className="mb-6">
                <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
                <Title level={2} className="text-green-600 mb-2">
                  Đăng ký thành công!
                </Title>
                <Text className="text-gray-600 block mb-4">
                  Chúng tôi đã gửi email xác thực đến:
                </Text>
                <Text strong className="text-lg">{userEmail}</Text>
              </div>
              
              <Alert
                message="Bước tiếp theo"
                description="Vui lòng kiểm tra email và nhập mã xác thực 6 chữ số để kích hoạt tài khoản."
                type="info"
                showIcon
                className="mb-6 text-left"
              />
              
              <Space direction="vertical" className="w-full" size="middle">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleGoToVerification}
                  className="bg-cyan-600 border-cyan-600 hover:bg-cyan-700 hover:border-cyan-700"
                >
                  Xác thực Email
                </Button>
                
                <Button
                  type="default"
                  size="large"
                  block
                  onClick={() => router.push('/auth/signin')}
                >
                  Quay lại đăng nhập
                </Button>
              </Space>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <Text className="text-sm text-yellow-800">
                  <strong>💡 Mẹo:</strong> Kiểm tra thư mục spam nếu không thấy email. 
                  Email xác thực có hiệu lực trong 5 phút.
                </Text>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mb-4">
                  <PasswordStrengthIndicator
                    password={password}
                  />
                </div>
              )}

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

            <div className="text-center mt-6 space-y-2">
              <div>
                <Text className="text-gray-600">
                  Đã có tài khoản?{' '}
                  <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">
                    Đăng nhập ngay
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
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}