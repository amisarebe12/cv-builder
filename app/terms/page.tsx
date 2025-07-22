'use client';

import React from 'react';
import { Typography, Card, Space, Divider, Alert, Row, Col } from 'antd';
import {
  CheckCircleOutlined,
  ToolOutlined,
  UserOutlined,
  CopyrightOutlined,
  FileProtectOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  EditOutlined,
  ContactsOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import Header from '../../components/Header';

const { Title, Paragraph, Text } = Typography;

const TermsPage: React.FC = () => {
  const sectionIcons = {
    acceptance: <CheckCircleOutlined className="text-2xl" />,
    service: <ToolOutlined className="text-2xl" />,
    account: <UserOutlined className="text-2xl" />,
    intellectual: <CopyrightOutlined className="text-2xl" />,
    content: <FileProtectOutlined className="text-2xl" />,
    liability: <ExclamationCircleOutlined className="text-2xl" />,
    termination: <StopOutlined className="text-2xl" />,
    changes: <EditOutlined className="text-2xl" />,
    contact: <ContactsOutlined className="text-2xl" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-8 -m-6 mb-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-pulse">
                  <FileTextOutlined className="text-4xl text-white" />
                </div>
                <Title level={1} className="text-white mb-2 text-3xl md:text-4xl font-bold">
                  Điều khoản sử dụng
                </Title>
                <Paragraph className="text-blue-100 text-lg mb-0">
                  📅 Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                </Paragraph>
              </div>
            </div>

            {/* Alert Section */}
            <Alert
              message="Thông báo quan trọng"
              description="Vui lòng đọc kỹ các điều khoản sử dụng này trước khi sử dụng dịch vụ CV Builder. Việc sử dụng dịch vụ đồng nghĩa với việc bạn đồng ý với tất cả các điều khoản được nêu ra."
              type="warning"
              showIcon
              className="mb-6"
            />

          <Space direction="vertical" size="large" className="w-full">
              <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.acceptance}
                  1. Chấp nhận điều khoản
                </Title>
              </div>
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-green-600 text-3xl">✅</div>
                  <div className="flex-1">
                    <Paragraph className="text-gray-700 font-medium mb-4">
                      Bằng việc truy cập và sử dụng website CV Builder, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng này.
                    </Paragraph>
                    <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
                      <Paragraph className="mb-0 text-red-800">
                        ⚠️ <strong>Lưu ý:</strong> Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.service}
                  2. Mô tả dịch vụ
                </Title>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-6">
                  🛠️ CV Builder là một công cụ trực tuyến miễn phí giúp người dùng tạo ra các bản CV chuyên nghiệp.
                </Paragraph>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                    <div className="text-blue-600 text-2xl mb-2">📄</div>
                    <div className="font-medium text-blue-700 mb-1">Mẫu CV đa dạng</div>
                    <div className="text-sm text-gray-600">Các mẫu CV chuyên nghiệp và hiện đại</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                    <div className="text-purple-600 text-2xl mb-2">✏️</div>
                    <div className="font-medium text-purple-700 mb-1">Chỉnh sửa trực tuyến</div>
                    <div className="text-sm text-gray-600">Công cụ chỉnh sửa dễ sử dụng</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                    <div className="text-green-600 text-2xl mb-2">📥</div>
                    <div className="font-medium text-green-700 mb-1">Xuất PDF</div>
                    <div className="text-sm text-gray-600">Tải CV dưới định dạng PDF chất lượng cao</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                    <div className="text-orange-600 text-2xl mb-2">☁️</div>
                    <div className="font-medium text-orange-700 mb-1">Lưu trữ Cloud</div>
                    <div className="text-sm text-gray-600">Lưu trữ CV an toàn trên cloud</div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.account}
                  3. Tài khoản người dùng
                </Title>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  👤 Để sử dụng một số tính năng của dịch vụ, bạn có thể cần tạo tài khoản. Bạn có trách nhiệm:
                </Paragraph>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-600">📝</span>
                      <span className="font-medium text-purple-700">Thông tin chính xác</span>
                    </div>
                    <div className="text-sm text-gray-600">Cung cấp thông tin chính xác và đầy đủ</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600">🔐</span>
                      <span className="font-medium text-blue-700">Bảo mật đăng nhập</span>
                    </div>
                    <div className="text-sm text-gray-600">Bảo mật thông tin đăng nhập của mình</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-600">🚨</span>
                      <span className="font-medium text-red-700">Thông báo vi phạm</span>
                    </div>
                    <div className="text-sm text-gray-600">Thông báo ngay nếu phát hiện sử dụng trái phép</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">⚖️</span>
                      <span className="font-medium text-green-700">Chịu trách nhiệm</span>
                    </div>
                    <div className="text-sm text-gray-600">Cho tất cả hoạt động dưới tài khoản của bạn</div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-orange-500/5 to-red-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.intellectual}
                  4. Quyền sở hữu trí tuệ
                </Title>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  ©️ Tất cả nội dung trên website, bao gồm thiết kế, mẫu CV, logo, văn bản, hình ảnh, và phần mềm, đều thuộc quyền sở hữu của CV Builder hoặc các bên cấp phép.
                </Paragraph>
                <div className="bg-red-100 border border-red-300 p-4 rounded-lg mb-4">
                  <Paragraph className="mb-2 text-red-800 font-medium">
                    🚫 <strong>Bạn không được:</strong>
                  </Paragraph>
                </div>
                <div className="grid md:grid-cols-1 gap-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-600">❌</span>
                      <span className="font-medium text-red-700">Sao chép cho mục đích thương mại</span>
                    </div>
                    <div className="text-sm text-gray-600">Sao chép, phân phối hoặc sử dụng nội dung cho mục đích thương mại</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-600">🔄</span>
                      <span className="font-medium text-orange-700">Tái tạo để bán lại</span>
                    </div>
                    <div className="text-sm text-gray-600">Tái tạo hoặc sửa đổi các mẫu CV để bán lại</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-purple-600">🏷️</span>
                      <span className="font-medium text-purple-700">Sử dụng thương hiệu</span>
                    </div>
                    <div className="text-sm text-gray-600">Sử dụng logo hoặc thương hiệu của chúng tôi mà không có sự cho phép</div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.content}
                  5. Nội dung người dùng
                </Title>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  📝 Bạn giữ quyền sở hữu đối với nội dung CV mà bạn tạo ra. Tuy nhiên, bằng việc sử dụng dịch vụ, bạn cấp cho chúng tôi quyền lưu trữ và xử lý nội dung này để cung cấp dịch vụ.
                </Paragraph>
                <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg mb-4">
                  <Paragraph className="mb-2 text-blue-800 font-medium">
                    ✅ <strong>Cam kết của bạn:</strong>
                  </Paragraph>
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircleOutlined className="text-green-600" />
                        <span className="font-medium text-green-700">Nội dung hợp pháp</span>
                      </div>
                      <div className="text-sm text-gray-600">Nội dung không vi phạm quyền của bên thứ ba</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <FileTextOutlined className="text-blue-600" />
                        <span className="font-medium text-blue-700">Thông tin chính xác</span>
                      </div>
                      <div className="text-sm text-gray-600">Thông tin trong CV là chính xác và trung thực</div>
                    </div>
                  </Col>
                  <Col xs={24} md={24}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationCircleOutlined className="text-red-600" />
                        <span className="font-medium text-red-700">Sử dụng hợp pháp</span>
                      </div>
                      <div className="text-sm text-gray-600">Không sử dụng dịch vụ cho mục đích bất hợp pháp</div>
                    </div>
                  </Col>
                </Row>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.liability}
                  6. Giới hạn trách nhiệm
                </Title>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  ⚠️ CV Builder cung cấp dịch vụ "như hiện tại" và không đảm bảo rằng dịch vụ sẽ luôn hoạt động mà không có lỗi hoặc gián đoạn.
                </Paragraph>
                <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg mb-4">
                  <Paragraph className="mb-2 text-yellow-800 font-medium">
                    🚫 <strong>Chúng tôi không chịu trách nhiệm cho:</strong>
                  </Paragraph>
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationCircleOutlined className="text-red-600" />
                        <span className="font-medium text-red-700">Mất mát dữ liệu</span>
                      </div>
                      <div className="text-sm text-gray-600">Mất mát dữ liệu hoặc nội dung</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <FileProtectOutlined className="text-orange-600" />
                        <span className="font-medium text-orange-700">Thiệt hại gián tiếp</span>
                      </div>
                      <div className="text-sm text-gray-600">Thiệt hại gián tiếp hoặc hậu quả</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <ToolOutlined className="text-blue-600" />
                        <span className="font-medium text-blue-700">Sử dụng CV</span>
                      </div>
                      <div className="text-sm text-gray-600">Việc sử dụng CV trong quá trình ứng tuyển</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircleOutlined className="text-purple-600" />
                        <span className="font-medium text-purple-700">Kết quả tuyển dụng</span>
                      </div>
                      <div className="text-sm text-gray-600">Kết quả tuyển dụng</div>
                    </div>
                  </Col>
                </Row>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-red-500/5 to-pink-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.termination}
                  7. Chấm dứt dịch vụ
                </Title>
              </div>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  🛑 Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài khoản của bạn trong các trường hợp sau:
                </Paragraph>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-600">⚖️</span>
                      <span className="font-medium text-red-700">Vi phạm điều khoản</span>
                    </div>
                    <div className="text-sm text-gray-600">Vi phạm các điều khoản sử dụng</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-600">🚫</span>
                      <span className="font-medium text-orange-700">Sử dụng bất hợp pháp</span>
                    </div>
                    <div className="text-sm text-gray-600">Sử dụng dịch vụ cho mục đích bất hợp pháp</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-purple-600">💻</span>
                      <span className="font-medium text-purple-700">Gây tổn hại hệ thống</span>
                    </div>
                    <div className="text-sm text-gray-600">Gây tổn hại đến hệ thống hoặc người dùng khác</div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.changes}
                  8. Thay đổi điều khoản
                </Title>
              </div>
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  📝 Chúng tôi có thể cập nhật các điều khoản này theo thời gian để phản ánh những thay đổi trong dịch vụ hoặc yêu cầu pháp lý.
                </Paragraph>
                <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600">📢</span>
                    <span className="font-medium text-green-700">Thông báo thay đổi:</span>
                  </div>
                  <div className="text-sm text-gray-600">Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc thông báo trên website. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận các điều khoản mới.</div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-purple-500/5 to-indigo-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.contact}
                  9. Liên hệ
                </Title>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  📞 Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua:
                </Paragraph>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm text-center">
                      <div className="text-blue-600 text-2xl mb-2">📧</div>
                      <div className="font-medium text-blue-700 mb-1">Email</div>
                      <div className="text-sm text-gray-600">dhhoang.dn2@gmail.com</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 shadow-sm text-center">
                      <div className="text-green-600 text-2xl mb-2">📱</div>
                      <div className="font-medium text-green-700 mb-1">Điện thoại</div>
                      <div className="text-sm text-gray-600">+84 123 456 789</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm text-center">
                      <div className="text-purple-600 text-2xl mb-2">📍</div>
                      <div className="font-medium text-purple-700 mb-1">Địa chỉ</div>
                      <div className="text-sm text-gray-600">123 Đường ABC, Quận 1, TP.HCM</div>
                    </div>
                  </Col>
                </Row>
              </div>
          </Space>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;