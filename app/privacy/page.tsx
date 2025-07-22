'use client';

import React from 'react';
import { Typography, Card, Space, Divider, Alert, Row, Col } from 'antd';
import { 
  SafetyOutlined, 
  ShieldCheckOutlined, 
  LockOutlined, 
  EyeOutlined,
  UserOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  SettingOutlined,
  FileProtectOutlined,
  ContactsOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import Header from '../../components/Header';

const { Title, Paragraph, Text } = Typography;

const PrivacyPage: React.FC = () => {
  const sectionIcons = {
    collect: <DatabaseOutlined className="text-blue-500" />,
    usage: <SettingOutlined className="text-green-500" />,
    sharing: <GlobalOutlined className="text-purple-500" />,
    security: <LockOutlined className="text-red-500" />,
    cookies: <EyeOutlined className="text-orange-500" />,
    rights: <UserOutlined className="text-indigo-500" />,
    storage: <ClockCircleOutlined className="text-teal-500" />,
    transfer: <GlobalOutlined className="text-cyan-500" />,
    children: <ShieldCheckOutlined className="text-pink-500" />,
    changes: <FileProtectOutlined className="text-yellow-500" />,
    contact: <ContactsOutlined className="text-gray-500" />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6 shadow-lg animate-pulse">
            <SafetyOutlined className="text-3xl text-white" />
          </div>
          <Title level={1} className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Chính sách bảo mật
          </Title>
          <Text className="text-lg text-gray-600 block mb-2">
            Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn
          </Text>
          <Text className="text-sm text-gray-500">
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </Text>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Alert Section */}
        <Alert
          message="🔒 Cam kết bảo mật tuyệt đối"
          description="Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn với các tiêu chuẩn bảo mật cao nhất. Chính sách này mô tả chi tiết cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn."
          type="info"
          showIcon
          className="mb-8 border-l-4 border-blue-500 shadow-md"
        />

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 p-6 -m-6 mb-6">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.collect}
                  1. Thông tin chúng tôi thu thập
                </Title>
              </div>

              <Paragraph className="text-gray-600 leading-relaxed">
                Khi bạn sử dụng CV Builder, chúng tôi có thể thu thập các loại thông tin sau:
              </Paragraph>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <Title level={4} className="flex items-center gap-2 text-blue-700 mb-3">
                    <UserOutlined /> 1.1. Thông tin cá nhân
                  </Title>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">• Họ và tên</li>
                    <li className="flex items-center gap-2">• Địa chỉ email</li>
                    <li className="flex items-center gap-2">• Số điện thoại</li>
                    <li className="flex items-center gap-2">• Địa chỉ</li>
                    <li className="flex items-center gap-2">• Thông tin nghề nghiệp và học vấn</li>
                    <li className="flex items-center gap-2">• Ảnh đại diện (nếu có)</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <Title level={4} className="flex items-center gap-2 text-green-700 mb-3">
                    <SettingOutlined /> 1.2. Thông tin kỹ thuật
                  </Title>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">• Địa chỉ IP</li>
                    <li className="flex items-center gap-2">• Loại trình duyệt và phiên bản</li>
                    <li className="flex items-center gap-2">• Hệ điều hành</li>
                    <li className="flex items-center gap-2">• Thời gian truy cập</li>
                    <li className="flex items-center gap-2">• Trang web tham chiếu</li>
                    <li className="flex items-center gap-2">• Cookie và công nghệ theo dõi tương tự</li>
                  </ul>
                </div>
              </div>

              <Divider className="my-8" />

              <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.usage}
                  2. Cách chúng tôi sử dụng thông tin
                </Title>
              </div>
              <Paragraph className="text-gray-600 leading-relaxed">
                Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
              </Paragraph>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-center gap-2">✅ Cung cấp và duy trì dịch vụ CV Builder</li>
                  <li className="flex items-center gap-2">✅ Tạo và lưu trữ CV của bạn</li>
                  <li className="flex items-center gap-2">✅ Cải thiện chất lượng dịch vụ</li>
                  <li className="flex items-center gap-2">✅ Gửi thông báo về cập nhật dịch vụ</li>
                  <li className="flex items-center gap-2">✅ Hỗ trợ khách hàng</li>
                  <li className="flex items-center gap-2">✅ Phân tích và thống kê sử dụng</li>
                  <li className="flex items-center gap-2">✅ Bảo mật và ngăn chặn gian lận</li>
                </ul>
              </div>

            <Divider />



            <Divider />

              <div className="bg-gradient-to-r from-orange-500/5 to-red-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.sharing}
                  3. Chia sẻ thông tin
                </Title>
              </div>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  🔒 Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.
                </Paragraph>
                <Paragraph className="text-gray-600 mb-4">
                  Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
                </Paragraph>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border-l-4 border-orange-400">
                    <span className="text-orange-600 font-medium">✓ Khi có sự đồng ý rõ ràng từ bạn</span>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-red-400">
                    <span className="text-red-600 font-medium">⚖️ Để tuân thủ pháp luật hoặc yêu cầu từ cơ quan có thẩm quyền</span>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-blue-400">
                    <span className="text-blue-600 font-medium">🛡️ Để bảo vệ quyền lợi, tài sản hoặc an toàn của chúng tôi và người dùng</span>
                  </div>
                  <div className="bg-white p-4 rounded border-l-4 border-green-400">
                    <span className="text-green-600 font-medium">🤝 Với các nhà cung cấp dịch vụ đáng tin cậy (chỉ trong phạm vi cần thiết)</span>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.security}
                  4. Bảo mật thông tin
                </Title>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-6">
                  🔐 Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ 
                  thông tin cá nhân của bạn khỏi việc truy cập, sử dụng, tiết lộ, thay đổi hoặc 
                  phá hủy trái phép.
                </Paragraph>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="text-blue-600 text-2xl mb-2">🔒</div>
                    <div className="font-medium text-blue-700 mb-1">Mã hóa SSL/TLS</div>
                    <div className="text-sm text-gray-600">Bảo vệ dữ liệu khi truyền tải</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                    <div className="text-purple-600 text-2xl mb-2">💾</div>
                    <div className="font-medium text-purple-700 mb-1">Mã hóa lưu trữ</div>
                    <div className="text-sm text-gray-600">Bảo vệ dữ liệu khi lưu trữ</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                    <div className="text-green-600 text-2xl mb-2">🚪</div>
                    <div className="font-medium text-green-700 mb-1">Kiểm soát truy cập</div>
                    <div className="text-sm text-gray-600">Quản lý quyền truy cập nghiêm ngặt</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <div className="text-orange-600 text-2xl mb-2">📊</div>
                    <div className="font-medium text-orange-700 mb-1">Giám sát hệ thống</div>
                    <div className="text-sm text-gray-600">Theo dõi và ghi log hoạt động</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                    <div className="text-red-600 text-2xl mb-2">🔄</div>
                    <div className="font-medium text-red-700 mb-1">Cập nhật bảo mật</div>
                    <div className="text-sm text-gray-600">Cập nhật thường xuyên</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <div className="text-indigo-600 text-2xl mb-2">👥</div>
                    <div className="font-medium text-indigo-700 mb-1">Sao lưu dữ liệu</div>
                    <div className="text-sm text-gray-600">Sao lưu định kỳ an toàn</div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.cookies}
                  5. Cookie và công nghệ theo dõi
                </Title>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  🍪 Chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm của bạn:
                </Paragraph>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <div className="text-yellow-600 text-xl mb-2">⚙️</div>
                      <div className="font-medium text-yellow-700 mb-2">Ghi nhớ tùy chọn</div>
                      <div className="text-sm text-gray-600">Lưu cài đặt và tùy chọn của bạn</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <div className="text-orange-600 text-xl mb-2">✨</div>
                      <div className="font-medium text-orange-700 mb-2">Cải thiện trải nghiệm</div>
                      <div className="text-sm text-gray-600">Tối ưu hóa giao diện người dùng</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <div className="text-blue-600 text-xl mb-2">📈</div>
                      <div className="font-medium text-blue-700 mb-2">Phân tích lưu lượng</div>
                      <div className="text-sm text-gray-600">Hiểu cách bạn sử dụng website</div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-green-600 text-xl mb-2">🎯</div>
                      <div className="font-medium text-green-700 mb-2">Nội dung phù hợp</div>
                      <div className="text-sm text-gray-600">Cung cấp nội dung phù hợp</div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-300">
                  <Paragraph className="mb-0 text-amber-800 text-sm">
                    💡 <strong>Lưu ý:</strong> Bạn có thể quản lý cookie thông qua cài đặt trình duyệt của mình.
                  </Paragraph>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.rights}
                  6. Quyền của bạn
                </Title>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-6">
                  👤 Bạn có các quyền sau đối với thông tin cá nhân của mình:
                </Paragraph>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeOutlined className="text-blue-600" />
                      <span className="font-medium text-blue-700">Quyền truy cập</span>
                    </div>
                    <div className="text-sm text-gray-600">Yêu cầu xem thông tin chúng tôi có về bạn</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <SettingOutlined className="text-green-600" />
                      <span className="font-medium text-green-700">Quyền chỉnh sửa</span>
                    </div>
                    <div className="text-sm text-gray-600">Cập nhật hoặc sửa đổi thông tin không chính xác</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-600">🗑️</span>
                      <span className="font-medium text-red-700">Quyền xóa</span>
                    </div>
                    <div className="text-sm text-gray-600">Yêu cầu xóa thông tin cá nhân</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-600">⛔</span>
                      <span className="font-medium text-orange-700">Quyền hạn chế</span>
                    </div>
                    <div className="text-sm text-gray-600">Hạn chế việc xử lý thông tin</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-600">📦</span>
                      <span className="font-medium text-purple-700">Quyền di chuyển</span>
                    </div>
                    <div className="text-sm text-gray-600">Nhận bản sao thông tin ở định dạng có thể đọc được</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-pink-400 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-pink-600">✋</span>
                      <span className="font-medium text-pink-700">Quyền phản đối</span>
                    </div>
                    <div className="text-sm text-gray-600">Phản đối việc xử lý thông tin cho mục đích tiếp thị</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-300">
                  <Paragraph className="mb-0 text-purple-800">
                    📧 <strong>Liên hệ:</strong> Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email: 
                    <span className="font-mono bg-white px-2 py-1 rounded text-purple-700">dhhoang.dn2@gmail.com</span>
                  </Paragraph>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-indigo-500/5 to-blue-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.storage}
                  7. Lưu trữ dữ liệu
                </Title>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                <Paragraph className="text-gray-700 font-medium mb-4">
                  💾 Chúng tôi lưu trữ thông tin cá nhân của bạn chỉ trong thời gian cần thiết để:
                </Paragraph>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <div className="text-indigo-600 text-xl mb-2">🛠️</div>
                    <div className="font-medium text-indigo-700 mb-1">Cung cấp dịch vụ</div>
                    <div className="text-sm text-gray-600">Duy trì và vận hành CV Builder</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                    <div className="text-blue-600 text-xl mb-2">⚖️</div>
                    <div className="font-medium text-blue-700 mb-1">Tuân thủ pháp luật</div>
                    <div className="text-sm text-gray-600">Đáp ứng các nghĩa vụ pháp lý</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                    <div className="text-green-600 text-xl mb-2">🤝</div>
                    <div className="font-medium text-green-700 mb-1">Giải quyết tranh chấp</div>
                    <div className="text-sm text-gray-600">Xử lý các vấn đề phát sinh</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                    <div className="text-purple-600 text-xl mb-2">📋</div>
                    <div className="font-medium text-purple-700 mb-1">Thực thi thỏa thuận</div>
                    <div className="text-sm text-gray-600">Duy trì các cam kết dịch vụ</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-lg border border-indigo-300">
                  <Paragraph className="mb-0 text-indigo-800">
                    🔄 <strong>Cam kết:</strong> Khi không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin của bạn một cách an toàn.
                  </Paragraph>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-teal-500/5 to-cyan-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.transfer}
                  8. Chuyển giao dữ liệu quốc tế
                </Title>
              </div>
              <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-teal-600 text-3xl">🌍</div>
                  <div className="flex-1">
                    <Paragraph className="text-gray-700 font-medium mb-3">
                      Thông tin của bạn có thể được xử lý và lưu trữ tại các máy chủ đặt ở các quốc gia khác nhau.
                    </Paragraph>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-teal-600">✅</span>
                        <span className="font-medium text-teal-700">Tuân thủ quy định bảo mật hiện hành</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-teal-600">🛡️</span>
                        <span className="font-medium text-teal-700">Có các biện pháp bảo vệ phù hợp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-pink-500/5 to-purple-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.children}
                  9. Trẻ em dưới 16 tuổi
                </Title>
              </div>
              <div className="bg-pink-50 border border-pink-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-pink-600 text-3xl">👶</div>
                  <div className="flex-1">
                    <Paragraph className="text-gray-700 font-medium mb-4">
                      🚫 Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi.
                    </Paragraph>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <div className="text-pink-600 text-xl mb-2">⚠️</div>
                        <div className="font-medium text-pink-700 mb-1">Không thu thập</div>
                        <div className="text-sm text-gray-600">Không cố ý thu thập thông tin từ trẻ em dưới 16 tuổi</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <div className="text-purple-600 text-xl mb-2">🗑️</div>
                        <div className="font-medium text-purple-700 mb-1">Xóa ngay lập tức</div>
                        <div className="text-sm text-gray-600">Nếu phát hiện, chúng tôi sẽ xóa thông tin ngay</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-yellow-500/5 to-amber-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.changes}
                  10. Thay đổi chính sách
                </Title>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-yellow-600 text-3xl">📝</div>
                  <div className="flex-1">
                    <Paragraph className="text-gray-700 font-medium mb-4">
                      🔄 Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
                    </Paragraph>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <div className="text-yellow-600 text-xl mb-2">📧</div>
                        <div className="font-medium text-yellow-700 mb-1">Thông báo qua email</div>
                        <div className="text-sm text-gray-600">Khi có thay đổi quan trọng</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-amber-200">
                        <div className="text-amber-600 text-xl mb-2">🌐</div>
                        <div className="font-medium text-amber-700 mb-1">Thông báo trên website</div>
                        <div className="text-sm text-gray-600">Hiển thị ngày cập nhật ở đầu trang</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <Divider />

              <div className="bg-gradient-to-r from-gray-500/5 to-slate-500/5 p-6 -m-6 mb-6 mt-8">
                <Title level={2} className="flex items-center gap-3 text-gray-800 mb-0">
                  {sectionIcons.contact}
                  11. Liên hệ
                </Title>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-gray-600 text-3xl">📞</div>
                  <div className="flex-1">
                    <Paragraph className="text-gray-700 font-medium mb-4">
                      💬 Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, vui lòng liên hệ với chúng tôi:
                    </Paragraph>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-600 text-xl">📧</span>
                          <span className="font-medium text-gray-700">Email</span>
                        </div>
                        <div className="font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded border">
                          dhhoang.dn2@gmail.com
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-600 text-xl">🏢</span>
                          <span className="font-medium text-gray-700">Đội ngũ hỗ trợ</span>
                        </div>
                        <div className="text-green-600 bg-green-50 px-3 py-2 rounded border">
                          CV Builder Support Team
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg border border-blue-300">
                      <Paragraph className="mb-0 text-blue-800">
                        ⏰ <strong>Cam kết phản hồi:</strong> Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày làm việc.
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;