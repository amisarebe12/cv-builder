'use client';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Space,
  Divider,
  Select,
  DatePicker,
  InputNumber,
  message,
  Tabs,
  Upload,
  Avatar,
  Tag,
  Modal
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  SaveOutlined,
  UploadOutlined,
  UserOutlined,
  LayoutOutlined
} from '@ant-design/icons';
import { CVData, CVModel, PersonalInfo, Experience, Education, Skill, Project } from '../models/CVModel';
import { CVService } from '../services/CVService';
import { sampleCVData } from '../data/cvData';
import PreviewModal from './PreviewModal';
import { getAllTemplates, getTemplateInfo } from '../utils/CVFactory';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface CVEditorProps {
  cvId?: string;
  templateId?: string;
  initialData?: any;
  onSave?: (cvData: any, title: string) => void;
  onCancel?: () => void;
}

const CVEditor: React.FC<CVEditorProps> = ({
  cvId,
  templateId = 'minimal',
  initialData,
  onSave,
  onCancel
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateId);
  const [templateSelectorVisible, setTemplateSelectorVisible] = useState(false);
  const [templates, setTemplates] = useState(getAllTemplates());

  useEffect(() => {
    if (initialData) {
      setCvData(initialData.cvData || initialData);
      populateForm(initialData.cvData || initialData);
      if (initialData.template) {
        setSelectedTemplateId(initialData.template);
      }
    } else if (cvId) {
      loadCVData();
    } else {
      initializeNewCV();
    }
  }, [cvId, initialData]);

  const loadCVData = async () => {
    if (!cvId) return;
    
    try {
      setLoading(true);
      const cvService = CVService.getInstance();
      const cv = await cvService.getCVById(cvId);
      
      if (cv) {
        const data = cv.toJSON();
        setCvData(data);
        populateForm(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải CV:', error);
      message.error('Không thể tải dữ liệu CV');
    } finally {
      setLoading(false);
    }
  };

  const initializeNewCV = async () => {
    try {
      setLoading(true);
      
      // Lấy dữ liệu mẫu từ CVService
      const cvService = CVService.getInstance();
      const sampleCVs = await cvService.getAllCVs();
      
      let newCVData: CVData;
      
      if (sampleCVs.length > 0) {
        // Sử dụng dữ liệu mẫu từ CV đầu tiên
        const sampleData = sampleCVs[0].toJSON();
        newCVData = {
          ...sampleData,
          id: `cv-${Date.now()}`,
          personalInfo: {
            ...sampleData.personalInfo,
            fullName: '',
            email: '',
            phone: '',
            address: ''
          }
        };
      } else {
        // Tạo CV trống nếu không có mẫu
        newCVData = {
          id: `cv-${Date.now()}`,
          personalInfo: {
            fullName: '',
            title: '',
            email: '',
            phone: '',
            address: '',
            website: '',
            linkedin: '',
            github: '',
            avatar: ''
          },
          summary: '',
          experiences: [],
          education: [],
          skills: [],
          projects: [],
          languages: [],
          certifications: []
        };
      }
      
      // Thêm lastModified để tránh lỗi
      newCVData.lastModified = new Date().toISOString();
      
      setCvData(newCVData);
      populateForm(newCVData);
    } catch (error) {
      console.error('Lỗi khi khởi tạo CV mới:', error);
      message.error('Không thể khởi tạo CV mới');
      
      // Tạo CV trống nếu có lỗi
      const emptyCV: CVData = {
        id: `cv-${Date.now()}`,
        personalInfo: {
          fullName: '',
          title: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          linkedin: '',
          github: '',
          avatar: ''
        },
        summary: '',
        experiences: [],
        education: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
        lastModified: new Date().toISOString()
      };
      
      setCvData(emptyCV);
      populateForm(emptyCV);
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data: CVData) => {
    form.setFieldsValue({
      personalInfo: data.personalInfo || {},
      summary: data.summary || '',
      experiences: (data.experiences || []).map(exp => ({
        ...exp,
        startDate: exp.startDate ? dayjs(exp.startDate) : null,
        endDate: exp.endDate && exp.endDate !== 'Present' ? dayjs(exp.endDate) : null
      })),
      education: (data.education || []).map(edu => ({
        ...edu,
        startDate: edu.startDate ? dayjs(edu.startDate) : null,
        endDate: edu.endDate ? dayjs(edu.endDate) : null
      })),
      skills: data.skills || [],
      projects: (data.projects || []).map(proj => ({
        ...proj,
        startDate: proj.startDate ? dayjs(proj.startDate) : null,
        endDate: proj.endDate ? dayjs(proj.endDate) : null
      })),
      languages: data.languages || [],
      certifications: (data.certifications || []).map(cert => ({
        ...cert,
        date: cert.date ? dayjs(cert.date) : null
      }))
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Chuyển đổi dữ liệu form thành CVData
      const updatedCVData: CVData = {
        id: cvData?.id || `cv-${Date.now()}`,
        personalInfo: values.personalInfo,
        summary: values.summary,
        experiences: values.experiences?.map((exp: any) => ({
          ...exp,
          id: exp.id || `exp-${Date.now()}-${Math.random()}`,
          startDate: exp.startDate ? exp.startDate.format('YYYY-MM') : '',
          endDate: exp.endDate ? exp.endDate.format('YYYY-MM') : 'Present',
          description: Array.isArray(exp.description) ? exp.description : (exp.description ? [exp.description] : [])
        })) || [],
        education: values.education?.map((edu: any) => ({
          ...edu,
          id: edu.id || `edu-${Date.now()}-${Math.random()}`,
          startDate: edu.startDate ? edu.startDate.format('YYYY-MM') : '',
          endDate: edu.endDate ? edu.endDate.format('YYYY-MM') : ''
        })) || [],
        skills: values.skills?.map((skill: any) => ({
          ...skill,
          id: skill.id || `skill-${Date.now()}-${Math.random()}`
        })) || [],
        projects: values.projects?.map((proj: any) => ({
          ...proj,
          id: proj.id || `proj-${Date.now()}-${Math.random()}`,
          startDate: proj.startDate ? proj.startDate.format('YYYY-MM') : '',
          endDate: proj.endDate ? proj.endDate.format('YYYY-MM') : ''
        })) || [],
        languages: values.languages || [],
        certifications: values.certifications?.map((cert: any) => ({
          ...cert,
          date: cert.date ? cert.date.format('YYYY-MM') : ''
        })) || [],
        lastModified: new Date().toISOString(),
        templateId: selectedTemplateId
      };

      // Tạo title từ thông tin cá nhân
      const title = values.personalInfo?.fullName 
        ? `CV - ${values.personalInfo.fullName}` 
        : 'CV không có tiêu đề';

      setCvData(updatedCVData);
      
      if (onSave) {
        onSave(updatedCVData, title);
      } else {
        message.success('Lưu CV thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi lưu CV:', error);
      message.error('Không thể lưu CV. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    if (!cvData) {
      message.warning('Chưa có dữ liệu CV để xem trước');
      return;
    }
    
    try {
      // Lấy dữ liệu hiện tại từ form
      const values = await form.validateFields();
      
      // Đảm bảo thông tin cá nhân cơ bản đã được điền
      if (!values.personalInfo?.fullName || !values.personalInfo?.email || !values.personalInfo?.phone) {
        message.warning('Vui lòng điền đầy đủ họ tên, email và số điện thoại trước khi xem trước');
        return;
      }
      
      // Sử dụng dữ liệu mẫu từ file data để fallback khi form chưa có dữ liệu
      
      // Tạo dữ liệu CV tạm thời từ form values với fallback data
      const previewCVData: CVData = {
        ...cvData,
        personalInfo: values.personalInfo,
        summary: values.summary || '',
        experiences: (values.experiences && values.experiences.length > 0) 
          ? values.experiences?.map((exp: any) => ({
              ...exp,
              id: exp.id || `exp-${Date.now()}-${Math.random()}`,
              startDate: exp.startDate ? exp.startDate.format('YYYY-MM') : '',
              endDate: exp.endDate ? exp.endDate.format('YYYY-MM') : 'Present',
              description: Array.isArray(exp.description) ? exp.description : (exp.description ? [exp.description] : [])
            }))
          : sampleCVData.experiences,
         education: (values.education && values.education.length > 0)
           ? values.education?.map((edu: any) => ({
               ...edu,
               id: edu.id || `edu-${Date.now()}-${Math.random()}`,
               startDate: edu.startDate ? edu.startDate.format('YYYY-MM') : '',
               endDate: edu.endDate ? edu.endDate.format('YYYY-MM') : ''
             }))
           : sampleCVData.education,
         skills: (values.skills && values.skills.length > 0)
           ? values.skills?.map((skill: any) => ({
               ...skill,
               id: skill.id || `skill-${Date.now()}-${Math.random()}`
             }))
           : sampleCVData.skills,
         projects: (values.projects && values.projects.length > 0)
           ? values.projects?.map((proj: any) => ({
               ...proj,
               id: proj.id || `proj-${Date.now()}-${Math.random()}`,
               startDate: proj.startDate ? proj.startDate.format('YYYY-MM') : '',
               endDate: proj.endDate ? proj.endDate.format('YYYY-MM') : ''
             }))
           : sampleCVData.projects,
         languages: (values.languages && values.languages.length > 0) ? values.languages : sampleCVData.languages,
         certifications: (values.certifications && values.certifications.length > 0)
           ? values.certifications?.map((cert: any) => ({
               ...cert,
               date: cert.date ? cert.date.format('YYYY-MM') : ''
             }))
           : sampleCVData.certifications,
        lastModified: new Date().toISOString()
      };
      
      // Cập nhật state tạm thời cho preview
      setCvData(previewCVData);
      setPreviewVisible(true);
    } catch (error) {
      // Nếu form không hợp lệ, hiển thị thông báo
      message.warning('Vui lòng điền đầy đủ thông tin cá nhân cơ bản trước khi xem trước');
    }
  };
  
  const handleOpenTemplateSelector = () => {
    setTemplateSelectorVisible(true);
  };
  
  const handleCloseTemplateSelector = () => {
    setTemplateSelectorVisible(false);
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setTemplateSelectorVisible(false);
    message.success(`Đã chọn mẫu ${getTemplateInfo(templateId)?.name}`);
  };
  
  const handlePreviewTemplate = (templateId: string) => {
    if (!cvData) {
      message.warning('Chưa có dữ liệu CV để xem trước');
      return;
    }
    
    try {
      // Lấy dữ liệu hiện tại từ form
      form.validateFields().then(values => {
        // Cập nhật templateId tạm thời cho preview
        const tempTemplateId = templateId;
        
        // Tạo dữ liệu CV tạm thời từ form values với fallback data
        const previewCVData: CVData = {
          ...cvData,
          personalInfo: values.personalInfo,
          summary: values.summary || '',
          experiences: (values.experiences && values.experiences.length > 0) 
            ? values.experiences?.map((exp: any) => ({
                ...exp,
                id: exp.id || `exp-${Date.now()}-${Math.random()}`,
                startDate: exp.startDate ? exp.startDate.format('YYYY-MM') : '',
                endDate: exp.endDate ? exp.endDate.format('YYYY-MM') : 'Present',
                description: Array.isArray(exp.description) ? exp.description : (exp.description ? [exp.description] : [])
              }))
            : sampleCVData.experiences,
          education: (values.education && values.education.length > 0)
            ? values.education?.map((edu: any) => ({
                ...edu,
                id: edu.id || `edu-${Date.now()}-${Math.random()}`,
                startDate: edu.startDate ? edu.startDate.format('YYYY-MM') : '',
                endDate: edu.endDate ? edu.endDate.format('YYYY-MM') : ''
              }))
            : sampleCVData.education,
          skills: (values.skills && values.skills.length > 0)
            ? values.skills?.map((skill: any) => ({
                ...skill,
                id: skill.id || `skill-${Date.now()}-${Math.random()}`
              }))
            : sampleCVData.skills,
          projects: (values.projects && values.projects.length > 0)
            ? values.projects?.map((proj: any) => ({
                ...proj,
                id: proj.id || `proj-${Date.now()}-${Math.random()}`,
                startDate: proj.startDate ? proj.startDate.format('YYYY-MM') : '',
                endDate: proj.endDate ? proj.endDate.format('YYYY-MM') : ''
              }))
            : sampleCVData.projects,
          languages: (values.languages && values.languages.length > 0) ? values.languages : sampleCVData.languages,
          certifications: (values.certifications && values.certifications.length > 0)
            ? values.certifications?.map((cert: any) => ({
                ...cert,
                date: cert.date ? cert.date.format('YYYY-MM') : ''
              }))
            : sampleCVData.certifications,
          lastModified: new Date().toISOString(),
          templateId: tempTemplateId // Thêm templateId vào dữ liệu preview
        };
        
        // Cập nhật state tạm thời cho preview
        setCvData(previewCVData);
        // Cập nhật templateId tạm thời cho preview
        setSelectedTemplateId(tempTemplateId);
        setPreviewVisible(true);
      }).catch(() => {
        // Nếu form không hợp lệ, hiển thị thông báo
        message.warning('Vui lòng điền đầy đủ thông tin cá nhân cơ bản trước khi xem trước');
      });
    } catch (error) {
      message.warning('Vui lòng điền đầy đủ thông tin cá nhân cơ bản trước khi xem trước');
    }
  };

  const renderPersonalInfoTab = () => (
    <Card title="Thông tin cá nhân" className="mb-6">
      <Row gutter={16}>
        <Col span={24} className="mb-4">
          <Form.Item
            name={['personalInfo', 'avatar']}
            label="Ảnh đại diện"
          >
            <div className="flex items-center gap-4">
              <Avatar 
                size={80} 
                src={form.getFieldValue(['personalInfo', 'avatar'])} 
                icon={<UserOutlined />}
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  // Xử lý upload ảnh (demo)
                  const file = info.file;
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      form.setFieldValue(['personalInfo', 'avatar'], e.target?.result);
                    };
                    reader.readAsDataURL(file as any);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
            </div>
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={['personalInfo', 'fullName']}
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input placeholder="Nguyễn Văn An" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={['personalInfo', 'title']}
            label="Chức danh"
            rules={[{ required: true, message: 'Vui lòng nhập chức danh' }]}
          >
            <Input placeholder="Senior Full-Stack Developer" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={['personalInfo', 'email']}
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={['personalInfo', 'phone']}
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder="+84 123 456 789" />
          </Form.Item>
        </Col>
        
        <Col span={24}>
          <Form.Item
            name={['personalInfo', 'address']}
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input placeholder="Hà Nội, Việt Nam" />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item
            name={['personalInfo', 'website']}
            label="Website"
          >
            <Input placeholder="https://yourwebsite.com" />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item
            name={['personalInfo', 'linkedin']}
            label="LinkedIn"
          >
            <Input placeholder="https://linkedin.com/in/yourprofile" />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item
            name={['personalInfo', 'github']}
            label="GitHub"
          >
            <Input placeholder="https://github.com/yourusername" />
          </Form.Item>
        </Col>
      </Row>
      
      <Divider />
      
      <Form.Item
        name="summary"
        label="Tóm tắt bản thân"
        rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
      >
        <TextArea 
          rows={4} 
          placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
        />
      </Form.Item>
    </Card>
  );

  const renderExperienceTab = () => (
    <Card title="Kinh nghiệm làm việc">
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'position']}
                      label="Vị trí"
                      rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
                    >
                      <Input placeholder="Senior Developer" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'company']}
                      label="Công ty"
                      rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
                    >
                      <Input placeholder="ABC Company" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Ngày bắt đầu"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="Ngày kết thúc"
                    >
                      <DatePicker picker="month" className="w-full" placeholder="Hiện tại" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Mô tả công việc"
                    >
                      <Select
                        mode="tags"
                        placeholder="Nhập mô tả công việc (mỗi dòng một mục)"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'technologies']}
                      label="Công nghệ sử dụng"
                    >
                      <Select
                        mode="tags"
                        placeholder="React, Node.js, TypeScript..."
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `exp-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm kinh nghiệm
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  const renderEducationTab = () => (
    <Card title="Học vấn">
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'degree']}
                      label="Bằng cấp"
                      rules={[{ required: true, message: 'Vui lòng nhập bằng cấp' }]}
                    >
                      <Input placeholder="Cử nhân Công nghệ Thông tin" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'institution']}
                      label="Trường học"
                      rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
                    >
                      <Input placeholder="Đại học Bách Khoa Hà Nội" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Ngày bắt đầu"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="Ngày kết thúc"
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'gpa']}
                      label="GPA"
                    >
                      <InputNumber 
                        min={0} 
                        max={4} 
                        step={0.1} 
                        placeholder="3.5" 
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Mô tả"
                    >
                      <TextArea 
                        rows={2} 
                        placeholder="Mô tả về chuyên ngành, thành tích..."
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `edu-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm học vấn
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  const renderSkillsTab = () => (
    <Card title="Kỹ năng">
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Tên kỹ năng"
                      rules={[{ required: true, message: 'Vui lòng nhập tên kỹ năng' }]}
                    >
                      <Input placeholder="React.js" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'level']}
                      label="Trình độ"
                      rules={[{ required: true, message: 'Vui lòng chọn trình độ' }]}
                    >
                      <Select placeholder="Chọn trình độ">
                        <Option value="Beginner">Mới bắt đầu</Option>
                        <Option value="Intermediate">Trung bình</Option>
                        <Option value="Advanced">Nâng cao</Option>
                        <Option value="Expert">Chuyên gia</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'category']}
                      label="Loại kỹ năng"
                      rules={[{ required: true, message: 'Vui lòng chọn loại kỹ năng' }]}
                    >
                      <Select placeholder="Chọn loại">
                        <Option value="Technical">Kỹ thuật</Option>
                        <Option value="Soft">Mềm</Option>
                        <Option value="Language">Ngôn ngữ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `skill-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm kỹ năng
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  const renderProjectsTab = () => (
    <Card title="Dự án">
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Tên dự án"
                      rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
                    >
                      <Input placeholder="E-commerce Website" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'role']}
                      label="Vai trò"
                    >
                      <Input placeholder="Full-stack Developer" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Ngày bắt đầu"
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="Ngày kết thúc"
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Mô tả dự án"
                    >
                      <TextArea 
                        rows={3} 
                        placeholder="Mô tả chi tiết về dự án, vai trò và thành tựu..."
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'technologies']}
                      label="Công nghệ sử dụng"
                    >
                      <Select
                        mode="tags"
                        placeholder="React, Node.js, MongoDB..."
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      label="Link dự án"
                    >
                      <Input placeholder="https://github.com/username/project" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `proj-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm dự án
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  const renderLanguagesTab = () => (
    <Card title="Ngôn ngữ">
      <Form.List name="languages">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Ngôn ngữ"
                      rules={[{ required: true, message: 'Vui lòng nhập tên ngôn ngữ' }]}
                    >
                      <Input placeholder="Tiếng Anh" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'level']}
                      label="Trình độ"
                      rules={[{ required: true, message: 'Vui lòng chọn trình độ' }]}
                    >
                      <Select placeholder="Chọn trình độ">
                        <Option value="Beginner">Cơ bản</Option>
                        <Option value="Intermediate">Trung bình</Option>
                        <Option value="Advanced">Nâng cao</Option>
                        <Option value="Native">Bản ngữ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `lang-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm ngôn ngữ
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  const renderCertificationsTab = () => (
    <Card title="Chứng chỉ">
      <Form.List name="certifications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card 
                key={key} 
                size="small" 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Tên chứng chỉ"
                      rules={[{ required: true, message: 'Vui lòng nhập tên chứng chỉ' }]}
                    >
                      <Input placeholder="AWS Certified Developer" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'issuer']}
                      label="Tổ chức cấp"
                      rules={[{ required: true, message: 'Vui lòng nhập tổ chức cấp' }]}
                    >
                      <Input placeholder="Amazon Web Services" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'date']}
                      label="Ngày cấp"
                    >
                      <DatePicker picker="month" className="w-full" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      label="Link chứng chỉ"
                    >
                      <Input placeholder="https://credential-url.com" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add({ id: `cert-${Date.now()}` })} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm chứng chỉ
            </Button>
          </>
        )}
      </Form.List>
    </Card>
  );

  if (!cvData) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="cv-editor">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {cvId ? 'Chỉnh sửa CV' : 'Tạo CV mới'}
        </h1>
        
        <Space>
          <Button 
            icon={<LayoutOutlined />} 
            onClick={handleOpenTemplateSelector}
          >
            Chọn mẫu CV
          </Button>
          
          <Button 
            icon={<EyeOutlined />} 
            onClick={handlePreview}
          >
            Xem trước
          </Button>
          
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            loading={loading}
            onClick={handleSave}
          >
            Lưu CV
          </Button>
          
          {onCancel && (
            <Button onClick={onCancel}>
              Hủy
            </Button>
          )}
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="cv-editor-form"
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Thông tin cá nhân" key="personal">
            {renderPersonalInfoTab()}
          </TabPane>
          
          <TabPane tab="Kinh nghiệm" key="experience">
            {renderExperienceTab()}
          </TabPane>
          
          <TabPane tab="Học vấn" key="education">
            {renderEducationTab()}
          </TabPane>
          
          <TabPane tab="Kỹ năng" key="skills">
            {renderSkillsTab()}
          </TabPane>
          
          <TabPane tab="Dự án" key="projects">
            {renderProjectsTab()}
          </TabPane>
          
          <TabPane tab="Ngôn ngữ" key="languages">
            {renderLanguagesTab()}
          </TabPane>
          
          <TabPane tab="Chứng chỉ" key="certifications">
            {renderCertificationsTab()}
          </TabPane>
        </Tabs>
      </Form>

      {/* Preview Modal */}
      {cvData && (
        <PreviewModal
          visible={previewVisible}
          onClose={() => setPreviewVisible(false)}
          templateId={selectedTemplateId}
          cvData={CVModel.fromJSON(cvData)}
          onSelect={handleSelectTemplate}
          key={`preview-${selectedTemplateId}-${Date.now()}`}
        />
      )}
      
      {/* Template Selector Modal */}
      <Modal
        title="Chọn mẫu CV"
        open={templateSelectorVisible}
        onCancel={handleCloseTemplateSelector}
        width="90vw"
        style={{ maxWidth: '1200px' }}
        footer={null}
      >
        <div className="template-selector-container py-4">
          <Row gutter={[24, 24]} className="items-stretch justify-center">
            {templates.map((template) => (
              <Col key={template.id} xs={24} sm={12} md={8} lg={6} xl={6} className="flex justify-center">
                <Card
                  hoverable
                  className={`w-full h-full flex flex-col ${selectedTemplateId === template.id ? 'border-2 border-blue-500' : ''}`}
                  cover={
                    <div className="relative pt-[140%] overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 p-4">
                        <div className="h-full flex flex-col">
                          {/* Header Section */}
                          <div className={`h-16 rounded-md mb-4 flex items-center justify-start px-4 ${
                            template.category === 'Professional' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                            template.category === 'Creative' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                            template.id === 'tech' ? 'bg-gradient-to-r from-sky-600 to-sky-700' :
                            template.id === 'legal' ? 'bg-gradient-to-r from-blue-800 to-blue-900' :
                            template.id === 'finance' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' :
                            template.id === 'construction' ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                            'bg-gradient-to-r from-gray-700 to-gray-800'
                          }`}>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {template.name.charAt(0)}
                                </span>
                              </div>
                              <div className="text-white">
                                <div className="text-sm font-semibold">Tên đầy đủ</div>
                                <div className="text-xs opacity-90">Chức danh</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content Sections */}
                          <div className="flex-1 space-y-4">
                            {/* Section 1 - Experience */}
                            <div className="bg-gray-50 rounded-md p-4 shadow-sm">
                              <div className="h-3 bg-gray-300 rounded mb-3 w-20"></div>
                              <div className="space-y-2">
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                              </div>
                            </div>
                            
                            {/* Section 2 - Education */}
                            <div className="bg-gray-50 rounded-md p-4 shadow-sm">
                              <div className="h-3 bg-gray-300 rounded mb-3 w-20"></div>
                              <div className="space-y-2">
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                              </div>
                            </div>
                            
                            {/* Section 3 - Skills */}
                            <div className="bg-gray-50 rounded-md p-4 shadow-sm">
                              <div className="h-3 bg-gray-300 rounded mb-3 w-20"></div>
                              <div className="flex flex-wrap gap-2">
                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                                <div className="h-6 bg-gray-200 rounded w-20"></div>
                                <div className="h-6 bg-gray-200 rounded w-14"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  actions={[
                    <Button key="preview" icon={<EyeOutlined />} onClick={() => handlePreviewTemplate(template.id)}>Xem trước</Button>,
                    <Button key="select" type="primary" onClick={() => handleSelectTemplate(template.id)}>Chọn</Button>
                  ]}
                >
                  <Card.Meta
                    title={template.name}
                    description={template.description}
                  />
                  <div className="mt-2">
                    <Tag color={
                      template.category === 'Professional' ? 'blue' :
                      template.category === 'Creative' ? 'purple' :
                      'green'
                    }>
                      {template.category === 'Professional' ? 'Chuyên nghiệp' :
                       template.category === 'Creative' ? 'Sáng tạo' : 'Truyền thống'}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default CVEditor;