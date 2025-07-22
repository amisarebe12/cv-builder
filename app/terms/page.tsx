'use client';

import React from 'react';
import { Typography, Card, Space, Divider } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <FileTextOutlined className="text-4xl text-blue-600 mb-4" />
            <Title level={1} className="text-gray-900">
              Điều khoản sử dụng
            </Title>
            <Text className="text-gray-500">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </Text>
          </div>

          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={2}>1. Chấp nhận điều khoản</Title>
              <Paragraph>
                Bằng việc truy cập và sử dụng website CV Builder, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>2. Mô tả dịch vụ</Title>
              <Paragraph>
                CV Builder là một công cụ trực tuyến miễn phí giúp người dùng tạo ra các bản CV chuyên nghiệp. Dịch vụ bao gồm:
              </Paragraph>
              <ul className="ml-6">
                <li>Các mẫu CV đa dạng và chuyên nghiệp</li>
                <li>Công cụ chỉnh sửa trực tuyến</li>
                <li>Tính năng xuất CV dưới định dạng PDF</li>
                <li>Lưu trữ CV trên cloud</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>3. Tài khoản người dùng</Title>
              <Paragraph>
                Để sử dụng một số tính năng của dịch vụ, bạn có thể cần tạo tài khoản. Bạn có trách nhiệm:
              </Paragraph>
              <ul className="ml-6">
                <li>Cung cấp thông tin chính xác và đầy đủ</li>
                <li>Bảo mật thông tin đăng nhập của mình</li>
                <li>Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái phép tài khoản</li>
                <li>Chịu trách nhiệm cho tất cả hoạt động diễn ra dưới tài khoản của bạn</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>4. Quyền sở hữu trí tuệ</Title>
              <Paragraph>
                Tất cả nội dung trên website, bao gồm nhưng không giới hạn ở thiết kế, mẫu CV, logo, văn bản, hình ảnh, và phần mềm, đều thuộc quyền sở hữu của CV Builder hoặc các bên cấp phép. Bạn không được:
              </Paragraph>
              <ul className="ml-6">
                <li>Sao chép, phân phối hoặc sử dụng nội dung cho mục đích thương mại</li>
                <li>Tái tạo hoặc sửa đổi các mẫu CV để bán lại</li>
                <li>Sử dụng logo hoặc thương hiệu của chúng tôi mà không có sự cho phép</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>5. Nội dung người dùng</Title>
              <Paragraph>
                Bạn giữ quyền sở hữu đối với nội dung CV mà bạn tạo ra. Tuy nhiên, bằng việc sử dụng dịch vụ, bạn cấp cho chúng tôi quyền lưu trữ và xử lý nội dung này để cung cấp dịch vụ. Bạn cam kết rằng:
              </Paragraph>
              <ul className="ml-6">
                <li>Nội dung không vi phạm quyền của bên thứ ba</li>
                <li>Thông tin trong CV là chính xác và trung thực</li>
                <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>6. Giới hạn trách nhiệm</Title>
              <Paragraph>
                CV Builder cung cấp dịch vụ "như hiện tại" và không đảm bảo rằng dịch vụ sẽ luôn hoạt động mà không có lỗi hoặc gián đoạn. Chúng tôi không chịu trách nhiệm cho:
              </Paragraph>
              <ul className="ml-6">
                <li>Mất mát dữ liệu hoặc nội dung</li>
                <li>Thiệt hại gián tiếp hoặc hậu quả</li>
                <li>Việc sử dụng CV trong quá trình ứng tuyển</li>
                <li>Kết quả tuyển dụng</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={2}>7. Chấm dứt dịch vụ</Title>
              <Paragraph>
                Chúng tôi có quyền chấm dứt hoặc đình chỉ quyền truy cập của bạn vào dịch vụ mà không cần thông báo trước nếu bạn vi phạm các điều khoản này hoặc sử dụng dịch vụ một cách không phù hợp.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>8. Thay đổi điều khoản</Title>
              <Paragraph>
                Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
              </Paragraph>
            </div>

            <Divider />

            <div>
              <Title level={2}>9. Liên hệ</Title>
              <Paragraph>
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua email: dhhoang.dn2@gmail.com
              </Paragraph>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;