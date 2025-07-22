import { CVData } from '../models/CVModel';

// Dữ liệu CV mẫu
export const sampleCVData: CVData = {
  id: 'cv-001',
  lastModified: new Date().toISOString(),
  personalInfo: {
    fullName: 'Nguyễn Văn An',
    title: 'Senior Full-Stack Developer',
    email: 'nguyenvanan@email.com',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    website: 'https://nguyenvanan.dev',
    linkedin: 'https://linkedin.com/in/nguyenvanan',
    github: 'https://github.com/nguyenvanan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  summary: 'Lập trình viên Full-Stack với hơn 5 năm kinh nghiệm phát triển ứng dụng web và mobile. Chuyên sâu về React, Node.js, và các công nghệ cloud. Đam mê tạo ra những sản phẩm có tác động tích cực đến người dùng.',
  experiences: [
    {
      id: 'exp-001',
      company: 'TechViet Solutions',
      position: 'Senior Full-Stack Developer',
      startDate: '2022-01',
      endDate: 'Present',
      description: [
        'Phát triển và duy trì các ứng dụng web quy mô lớn phục vụ hơn 100,000 người dùng',
        'Thiết kế kiến trúc microservices và triển khai trên AWS',
        'Mentoring cho 3 junior developers và review code',
        'Tối ưu hiệu suất ứng dụng, giảm thời gian tải trang 40%'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      id: 'exp-002',
      company: 'StartupXYZ',
      position: 'Full-Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      description: [
        'Xây dựng MVP cho startup fintech từ đầu',
        'Phát triển API RESTful và GraphQL',
        'Tích hợp payment gateway và third-party services',
        'Implement CI/CD pipeline và automated testing'
      ],
      technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Redis', 'Jest', 'GitLab CI']
    },
    {
      id: 'exp-003',
      company: 'Digital Agency ABC',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2020-02',
      description: [
        'Phát triển giao diện responsive cho các website thương mại điện tử',
        'Tối ưu SEO và hiệu suất trang web',
        'Làm việc trực tiếp với designer và client',
        'Maintain và update hơn 20 websites'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'WordPress']
    }
  ],
  education: [
    {
      id: 'edu-001',
      institution: 'Đại học Bách Khoa Hà Nội',
      degree: 'Cử nhân',
      field: 'Công nghệ Thông tin',
      startDate: '2015-09',
      endDate: '2019-06',
      gpa: '3.7/4.0',
      description: 'Chuyên ngành Kỹ thuật Phần mềm. Tốt nghiệp loại Khá.'
    }
  ],
  skills: [
    // Technical Skills
    { id: 'skill-001', name: 'JavaScript', level: 'Expert', category: 'Technical' },
    { id: 'skill-002', name: 'TypeScript', level: 'Advanced', category: 'Technical' },
    { id: 'skill-003', name: 'React', level: 'Expert', category: 'Technical' },
    { id: 'skill-004', name: 'Next.js', level: 'Advanced', category: 'Technical' },
    { id: 'skill-005', name: 'Vue.js', level: 'Advanced', category: 'Technical' },
    { id: 'skill-006', name: 'Node.js', level: 'Expert', category: 'Technical' },
    { id: 'skill-007', name: 'Express.js', level: 'Advanced', category: 'Technical' },
    { id: 'skill-008', name: 'PostgreSQL', level: 'Advanced', category: 'Technical' },
    { id: 'skill-009', name: 'MongoDB', level: 'Intermediate', category: 'Technical' },
    { id: 'skill-010', name: 'AWS', level: 'Intermediate', category: 'Technical' },
    { id: 'skill-011', name: 'Docker', level: 'Intermediate', category: 'Technical' },
    { id: 'skill-012', name: 'Git', level: 'Advanced', category: 'Technical' },
    
    // Soft Skills
    { id: 'skill-013', name: 'Team Leadership', level: 'Advanced', category: 'Soft' },
    { id: 'skill-014', name: 'Problem Solving', level: 'Expert', category: 'Soft' },
    { id: 'skill-015', name: 'Communication', level: 'Advanced', category: 'Soft' },
    { id: 'skill-016', name: 'Project Management', level: 'Intermediate', category: 'Soft' },
    
    // Languages
    { id: 'skill-017', name: 'Vietnamese', level: 'Expert', category: 'Language' },
    { id: 'skill-018', name: 'English', level: 'Advanced', category: 'Language' }
  ],
  projects: [
    {
      id: 'proj-001',
      name: 'E-commerce Platform',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý kho, và analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      url: 'https://ecommerce-demo.com',
      github: 'https://github.com/nguyenvanan/ecommerce-platform',
      startDate: '2023-01',
      endDate: '2023-06'
    },
    {
      id: 'proj-002',
      name: 'Task Management App',
      description: 'Ứng dụng quản lý công việc theo nhóm với real-time collaboration và notification.',
      technologies: ['Vue.js', 'Express.js', 'Socket.io', 'MongoDB'],
      url: 'https://taskapp-demo.com',
      github: 'https://github.com/nguyenvanan/task-management',
      startDate: '2022-08',
      endDate: '2022-12'
    },
    {
      id: 'proj-003',
      name: 'Weather Dashboard',
      description: 'Dashboard hiển thị thông tin thời tiết với data visualization và forecast.',
      technologies: ['React', 'D3.js', 'OpenWeather API'],
      url: 'https://weather-dashboard-demo.com',
      github: 'https://github.com/nguyenvanan/weather-dashboard',
      startDate: '2022-03',
      endDate: '2022-05'
    }
  ],
  languages: [
    { name: 'Tiếng Việt', level: 'Bản ngữ' },
    { name: 'English', level: 'Thành thạo' },
    { name: '日本語', level: 'Cơ bản' }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2023-03'
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022-11'
    },
    {
      name: 'Google Analytics Certified',
      issuer: 'Google',
      date: '2022-08'
    }
  ]
};

// Danh sách các template CV có sẵn
export const cvTemplates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Thiết kế tối giản, chuyên nghiệp',
    preview: '/images/template-minimal-preview.jpg',
    category: 'Professional'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Thiết kế hiện đại, bắt mắt',
    preview: '/images/template-modern-preview.jpg',
    category: 'Creative'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Thiết kế cổ điển, thanh lịch',
    preview: '/images/template-classic-preview.jpg',
    category: 'Traditional'
  }
];

// Metadata cho các template
export const templateMetadata = {
  minimal: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f1f5f9'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: 'single-column'
  },
  modern: {
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#f3e8ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    layout: 'two-column'
  },
  classic: {
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#f9fafb'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Source Sans Pro'
    },
    layout: 'traditional'
  }
};