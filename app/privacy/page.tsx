'use client';

import React from 'react';
import { Typography, Card, Space, Divider, Alert } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import Header from '../../components/Header';

const { Title, Paragraph, Text } = Typography;

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <SafetyOutlined className="text-4xl text-green-600 mb-4" />
            <Title level={1} className="text-gray-900">
              Chính sách bảo mật
            </Title>
            <Text className="text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </Text>
          </div>

          <Alert
            message="Cam kết bảo mật"
            description="Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn."
            type="info"
            showIcon
            className="mb-6"
          />

          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={2}>1. Thông tin chúng tôi thu thập</Title>
              <Paragraph>
                Khi bạn sử dụng CV Builder, chúng tôi có thể thu thập các loại thông tin sau:
              </Paragraph>
              
              <Title level={4}>1.1. Thông tin cá nhân</Title>
              <ul className="ml-6">
                <li>Họ và tên</li>
                <li>Địa chỉ email</li>
                <li>Số điện thoại</li>
                <li>Địa chỉ</li>
                <li>Thông tin nghề nghiệp và học vấn</li>
                <li>Ảnh đại diện (nếu có)</li>
              </ul>

              <Title level={4}>1.2. Thông tin kỹ thuật</Title>
              <ul className="ml-6">
                <li>Địa chỉ IP</li>
                <li>Loại trình duyệt và phiên bản</li>
                <li>Hệ điều hành</li>
                <li>Thời gian truy cập</li>
                <li>Trang web tham chiếu</li>
                <li>Cookie và công nghệ theo dõi tương tự</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>2. Cách chúng tôi sử dụng thông tin</Title>
              <Paragraph>
                Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
              </Paragraph>
              <ul className="ml-6">
                <li>Cung cấp và duy trì dịch vụ CV Builder</li>
                <li>Tạo và lưu trữ CV của bạn</li>
                <li>Cải thiện chất lượng dịch vụ</li>
                <li>Gửi thông báo về cập nhật dịch vụ</li>
                <li>Hỗ trợ khách hàng</li>
                <li>Phân tích và thống kê sử dụng</li>
                <li>Bảo mật và ngăn chặn gian lận</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>3. Chia sẻ thông tin</Title>
              <Paragraph>
                Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ các trường hợp sau:
              </Paragraph>
              <ul className="ml-6">
                <li>Khi có sự đồng ý rõ ràng từ bạn</li>
                <li>Để tuân thủ yêu cầu pháp lý</li>
                <li>Bảo vệ quyền lợi và an toàn của chúng tôi và người dùng khác</li>
                <li>Với các nhà cung cấp dịch vụ đáng tin cậy (dưới các thỏa thuận bảo mật nghiêm ngặt)</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>4. Bảo mật thông tin</Title>
              <Paragraph>
                Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn:
              </Paragraph>
              <ul className="ml-6">
                <li>Mã hóa dữ liệu khi truyền tải (SSL/TLS)</li>
                <li>Mã hóa dữ liệu khi lưu trữ</li>
                <li>Kiểm soát truy cập nghiêm ngặt</li>
                <li>Giám sát bảo mật thường xuyên</li>
                <li>Sao lưu dữ liệu định kỳ</li>
                <li>Cập nhật bảo mật thường xuyên</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>5. Cookie và công nghệ theo dõi</Title>
              <Paragraph>
                Chúng tôi sử dụng cookie và các công nghệ tương tự để:
              </Paragraph>
              <ul className="ml-6">
                <li>Ghi nhớ tùy chọn của bạn</li>
                <li>Cải thiện trải nghiệm người dùng</li>
                <li>Phân tích lưu lượng truy cập</li>
                <li>Cung cấp nội dung phù hợp</li>
              </ul>
              <Paragraph>
                Bạn có thể quản lý cookie thông qua cài đặt trình duyệt của mình.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>6. Quyền của bạn</Title>
              <Paragraph>
                Bạn có các quyền sau đối với thông tin cá nhân của mình:
              </Paragraph>
              <ul className="ml-6">
                <li><strong>Quyền truy cập:</strong> Yêu cầu xem thông tin chúng tôi có về bạn</li>
                <li><strong>Quyền chỉnh sửa:</strong> Cập nhật hoặc sửa đổi thông tin không chính xác</li>
                <li><strong>Quyền xóa:</strong> Yêu cầu xóa thông tin cá nhân</li>
                <li><strong>Quyền hạn chế:</strong> Hạn chế việc xử lý thông tin</li>
                <li><strong>Quyền di chuyển:</strong> Nhận bản sao thông tin ở định dạng có thể đọc được</li>
                <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý thông tin cho mục đích tiếp thị</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>7. Lưu trữ dữ liệu</Title>
              <Paragraph>
                Chúng tôi chỉ lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để:
              </Paragraph>
              <ul className="ml-6">
                <li>Cung cấp dịch vụ mà bạn yêu cầu</li>
                <li>Tuân thủ các nghĩa vụ pháp lý</li>
                <li>Giải quyết tranh chấp</li>
                <li>Thực thi các thỏa thuận của chúng tôi</li>
              </ul>
              <Paragraph>
                Khi không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin của bạn một cách an toàn.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>8. Chuyển giao dữ liệu quốc tế</Title>
              <Paragraph>
                Thông tin của bạn có thể được xử lý và lưu trữ tại các máy chủ đặt ở các quốc gia khác nhau. Chúng tôi đảm bảo rằng việc chuyển giao này tuân thủ các quy định bảo mật hiện hành và có các biện pháp bảo vệ phù hợp.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>9. Trẻ em dưới 16 tuổi</Title>
              <Paragraph>
                Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 16 tuổi. Nếu chúng tôi phát hiện đã thu thập thông tin từ trẻ em dưới 16 tuổi, chúng tôi sẽ xóa thông tin đó ngay lập tức.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>10. Thay đổi chính sách</Title>
              <Paragraph>
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo trên website. Ngày cập nhật cuối cùng sẽ được hiển thị ở đầu chính sách này.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>11. Liên hệ</Title>
              <Paragraph>
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, vui lòng liên hệ với chúng tôi:
              </Paragraph>
              <ul className="ml-6">
                <li><strong>Email:</strong> dhhoang.dn2@gmail.com</li>
                <li><strong>Địa chỉ:</strong> CV Builder Support Team</li>
              </ul>
              <Paragraph>
                Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày làm việc.
              </Paragraph>
            </div>
          </Space>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;