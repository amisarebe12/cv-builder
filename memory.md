# CV Builder Project - Memory Documentation

## 📋 Yêu cầu ban đầu

### Mục tiêu chính
- Tạo ứng dụng Next.js để xây dựng CV online
- Nhấn mạnh thiết kế hướng đối tượng (OOP), tính modular và khả năng tái sử dụng
- Cho phép người dùng tạo và xem trước các mẫu CV online
- Giao diện hiện đại, dễ mở rộng, có thể thêm template hoặc tính năng mới mà không phá vỡ hệ thống hiện tại

### Yêu cầu kỹ thuật
- **Framework**: Next.js App Router
- **Node.js**: v22.17.1 compatibility
- **Styling**: Full Tailwind CSS configuration
- **Language**: TypeScript
- **UI Components**: Ant Design cho các component cụ thể
- **Data**: Mock JSON data cho CVs
- **Architecture**: OOP và Clean Architecture principles

### Cấu trúc thư mục yêu cầu
```
mycv/
├── models/           # CV data models
├── services/         # Business logic services
├── components/
│   └── templates/    # CV templates kế thừa từ base class
├── utils/           # Utilities và factories
├── data/            # Mock data
└── app/             # Next.js app directory
```

### Tính năng yêu cầu
1. **Homepage**: Hiển thị 3 mẫu CV với preview images, tên, nút "Preview" và "Select"
2. **Modal**: Xem chi tiết CV preview
3. **Data Source**: CV data từ `cvData.ts` hoặc `cvData.json`
4. **Output**: Dự án Next.js hoàn chỉnh, có thể chạy được
5. **Code Quality**: Không có TODOs, placeholders, giao diện clean và nhất quán
6. **Documentation**: Code comments rõ ràng cho khả năng mở rộng

## 🏗️ Kiến trúc OOP đã triển khai

### Design Patterns sử dụng
1. **Singleton Pattern**: CVService, CVFactory
2. **Factory Pattern**: CVFactory để quản lý templates
3. **Template Method Pattern**: CVTemplateBase với abstract render method
4. **Strategy Pattern**: Các template khác nhau implement cùng interface

### Nguyên tắc OOP
- **Encapsulation**: Dữ liệu và methods được đóng gói trong classes
- **Inheritance**: Tất cả templates kế thừa từ CVTemplateBase
- **Polymorphism**: Các templates có thể được sử dụng thông qua interface chung
- **Abstraction**: CVTemplateBase định nghĩa contract cho tất cả templates

## 📁 Cấu trúc dự án đã tạo

### Core Models
- **CVModel.ts**: Định nghĩa interfaces và CVModel class
  - `PersonalInfo`, `Experience`, `Education`, `Skill`, `Project`, `CVData` interfaces
  - `CVModel` class với validation và utility methods

### Services
- **CVService.ts**: Singleton service quản lý CV data
  - CRUD operations cho CV
  - Search và statistics functionality
  - Simulated API latency

### Templates Architecture
- **CVTemplateBase.tsx**: Abstract base class cho tất cả templates
  - `CVTemplateProps` interface
  - `TemplateConfig` interface
  - Abstract `render()` method
  - Common utility methods (formatDate, getSkillLevelStyle, etc.)
  - Validation methods
  - Print styles generation
  - HOC `withTemplateBase`

### Concrete Templates
1. **TemplateMinimal.tsx**: MinimalTemplate class
   - Thiết kế tối giản, chuyên nghiệp
   - Single column layout
   - Clean typography

2. **TemplateModern.tsx**: ModernTemplate class
   - Thiết kế hiện đại, bắt mắt
   - Two-column layout
   - Gradient colors và modern styling

3. **TemplateCreative.tsx**: CreativeTemplate class
   - Thiết kế sáng tạo với màu sắc nổi bật
   - Creative layout với gradient backgrounds
   - Unique visual elements

### Factory Pattern
- **CVFactory.ts**: Singleton factory class
  - Dynamic template registration
  - Template metadata management
  - Search và filtering capabilities
  - Lazy loading support

### Components
- **CVCard.tsx**: Functional component hiển thị template cards
  - Professional placeholder design với CV-like layout
  - Dynamic header colors theo category (Professional: blue, Creative: purple, Traditional: gray)
  - 4 content sections mô phỏng: Experience, Education, Skills, Contact
  - Optimized sizing: 300px height, 3:4 aspect ratio
  - Template name badge và category badge
  - Hover effects và selection indicators
  - Reusable placeholder cho tất cả templates tương lai
- **PreviewModal.tsx**: Modal component cho preview CV
  - Dynamic template loading
  - Print/download functionality
  - Error handling
- **TemplateSelector.tsx**: Component chọn và lọc templates
  - Search functionality
  - Filter by category
  - Template grid display
- **SelectedTemplateInfo.tsx**: Panel hiển thị thông tin template đã chọn
  - Template details
  - Action buttons
- **StatsSection.tsx**: Component hiển thị thống kê ứng dụng
  - Template count
  - User statistics
- **Header.tsx**: Navigation header
  - Mobile responsive menu
  - Logo và navigation links
- **Footer.tsx**: Footer component
  - Contact information
  - Social links

### Data Layer
- **cvData.ts**: Sample CV data và template metadata
  - `sampleCVData` object
  - `cvTemplates` array
  - `templateMetadata` definitions

## 🔧 Configuration Files

### Next.js Configuration
- **next.config.js**: Next.js config với transpilePackages cho antd
- **tsconfig.json**: TypeScript configuration với path aliases
- **tailwind.config.js**: Tailwind CSS với custom theme
- **postcss.config.js**: PostCSS configuration

### Package Dependencies
- **package.json**: 
  - Next.js 14.0.0
  - React 18
  - TypeScript
  - Tailwind CSS
  - Ant Design
  - Lucide React (icons)

## 🎨 Styling Guidelines

### Tailwind CSS Classes sử dụng
- **Layout**: `grid`, `flex`, `container`
- **Spacing**: `p-*`, `m-*`, `gap-*`
- **Colors**: Custom primary colors, gradients
- **Typography**: `font-*`, `text-*`
- **Effects**: `shadow-*`, `hover:*`, `transition-*`

### Ant Design Components
- **Modal**: Cho preview functionality
- **Button**: Primary và secondary actions
- **Card**: Template display
- **Spin**: Loading states
- **Grid**: Layout system

## 🚀 Extensibility Guidelines

### Thêm Template mới
1. Tạo class mới kế thừa từ `CVTemplateBase`
2. Implement abstract `render()` method
3. Export template instance
4. Đăng ký trong `CVFactory`
5. Thêm metadata vào `cvData.ts`

### Thêm tính năng mới
1. **Models**: Mở rộng interfaces trong `CVModel.ts`
2. **Services**: Thêm methods vào `CVService.ts`
3. **Components**: Tạo components mới trong `/components`
4. **Templates**: Sử dụng utility methods từ `CVTemplateBase`

## 📝 Code Standards

### TypeScript
- Strict type checking enabled
- Interface-first approach
- Proper error handling
- JSDoc comments cho public methods

### React
- Functional components với hooks
- Proper prop typing
- Error boundaries
- Suspense cho lazy loading

### CSS
- Tailwind-first approach
- Responsive design

## 📄 Pages và Navigation

### Static Pages
- **Privacy Page** (`/privacy`): Trang chính sách bảo mật
  - Hiển thị đầy đủ thông tin về thu thập và sử dụng dữ liệu
  - Có header navigation để quay về trang chủ
  - Layout responsive với Ant Design components
  
- **Terms Page** (`/terms`): Trang điều khoản sử dụng
  - Hiển thị các điều khoản và điều kiện sử dụng dịch vụ
  - Có header navigation để quay về trang chủ
  - Layout nhất quán với privacy page

### Navigation Improvements
- **Header Navigation**: Đã thêm vào tất cả các trang static
  - Component Header được import và sử dụng
  - Cho phép người dùng dễ dàng quay về trang chủ
  - Menu responsive với mobile drawer
  - Logo CV Builder và navigation links

### Layout Structure
- Tất cả static pages sử dụng cấu trúc:
  ```jsx
  <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="py-8">
      {/* Page content */}
    </div>
  </div>
  ```
- Print-friendly styles
- Accessibility considerations

## 🔍 Testing Considerations

### Areas for testing
- Template rendering
- CV data validation
- Factory pattern functionality
- Service layer operations
- Component interactions

## 📊 Performance Optimizations

### Implemented
- Lazy loading cho templates
- Dynamic imports
- Memoization trong components
- Optimized bundle splitting

### Future considerations
- Image optimization
- Caching strategies
- Code splitting
- SSR/SSG implementation

## 🐛 Known Issues & Solutions

### Resolved
- Ant Design Spin component warning → Fixed với proper nesting
- Next.js config warning → Removed deprecated appDir option
- Metadata viewport warning → Separated viewport export
- Syntax error trong CVEditor.tsx → Fixed bằng cách restart Next.js server

### Monitoring
- Bundle size
- Runtime performance
- Memory usage
- Loading times

## 🎯 Tình trạng hiện tại

### ✅ Đã hoàn thành
- [x] Cấu trúc dự án cơ bản
- [x] Models và Services với print/download functionality
- [x] Template system với Factory pattern (3 templates: Minimal, Modern, Classic)
- [x] Components hoàn chỉnh:
  - [x] CVCard - Hiển thị thông tin template
  - [x] PreviewModal - Xem trước và tải xuống CV
  - [x] TemplateSelector - Chọn và lọc templates
  - [x] SelectedTemplateInfo - Hiển thị template đã chọn
  - [x] StatsSection - Thống kê ứng dụng
  - [x] Header - Navigation và menu
  - [x] Footer - Thông tin liên hệ và links
  - [x] CVEditor - Chỉnh sửa thông tin CV (đã sửa lỗi cú pháp)
- [x] Trang chủ hoàn chỉnh với layout chuyên nghiệp
- [x] Chức năng preview, print và download CV (PDF/HTML)
- [x] Responsive design cho mobile và desktop
- [x] Mock data và cấu hình hoàn chỉnh
- [x] UI/UX hiện đại với Tailwind CSS và Ant Design
- [x] Debugging và khắc phục lỗi cú pháp
- [x] Cải thiện giao diện danh sách mẫu CV:
  - [x] Đồng bộ kích thước và căn chỉnh các thẻ CV
  - [x] Tối ưu hiển thị tag danh mục và badge
  - [x] Cải thiện bố cục grid và responsive layout
  - [x] Đồng bộ kích thước nút hành động

### 🔄 Đang phát triển
- [x] Chức năng chỉnh sửa CV (form editor)
- [ ] Trang quản lý CV cá nhân
- [ ] Authentication system
- [ ] Database integration

### 📋 Kế hoạch tiếp theo
1. ✅ Tạo CV Editor với form nhập liệu
2. Implement user authentication
3. Thêm database để lưu trữ CV
4. Tạo dashboard quản lý CV
5. Thêm more templates
6. SEO optimization và performance tuning

## 📈 Future Roadmap

### Phase 1 (Current)
- ✅ Basic template system
- ✅ Preview functionality
- ✅ OOP architecture
- ✅ Complete homepage with professional layout
- ✅ Print/Download functionality

### Phase 2 (Potential)
- [x] CV editing functionality
- [ ] User authentication
- [ ] Template customization
- [ ] Database integration

### Phase 3 (Advanced)
- [ ] Real-time collaboration
- [ ] Template marketplace
- [ ] AI-powered suggestions
- [ ] Analytics dashboard

## 🔄 Recent Updates & Improvements

### Metadata Configuration Improvement
**Date**: December 2024
**Changes**:
- **Cấu hình metadataBase**: Thêm cấu hình metadataBase trong layout.tsx để giải quyết cảnh báo
- **Sử dụng biến môi trường**: Thêm biến baseUrl để linh hoạt trong việc cấu hình URL cơ sở
- **Cải thiện SEO**: Đảm bảo các thẻ OpenGraph và Twitter cards hoạt động chính xác

### UI Improvements - CV Template List Interface
**Date**: December 2024
**Changes**:
- **Đồng bộ kích thước thẻ CV**: Thiết lập chiều rộng cố định (240px) và chiều cao (320px) cho mỗi thẻ CV
- **Căn chỉnh các thành phần bên trong**: Thêm z-index và justify-start để đảm bảo hiển thị đúng
- **Đồng bộ tag danh mục**: Thay đổi từ min-width sang width/height cố định (110px x 36px) cho tất cả tag
- **Cải thiện tooltip và badge**: Thêm z-index, truncate và kích thước cố định cho các badge
- **Đồng bộ nút hành động**: Thay đổi từ min-height sang height cố định (50px) cho các nút
- **Cải thiện bố cục grid**: Điều chỉnh gutter (24px), thêm justify-center và cập nhật responsive breakpoints
- **Tối ưu hiển thị tiêu đề và mô tả**: Thêm truncate và flex-shrink-0 để tránh tràn nội dung

### Debugging & Error Fixes
**Date**: December 2024
**Changes**:
- **CVEditor.tsx Syntax Error**: Khắc phục lỗi cú pháp trong component CVEditor.tsx
- **Server Restart**: Giải quyết lỗi "Expression expected" bằng cách restart Next.js server
- **Metadata Warning**: Xử lý cảnh báo về metadata.metadataBase không được thiết lập
- **Compilation Stability**: Cải thiện quy trình biên dịch để tránh lỗi cú pháp tạm thời

### CVCard Placeholder Optimization
**Date**: December 2024
**Changes**:
- **Kích thước đồng nhất**: Thiết lập chiều rộng cố định 240px và chiều cao 320px cho tất cả thẻ CV
- **Spacing cải thiện**: Tối ưu padding (p-4) và margin để đảm bảo không gian hiển thị nhất quán
- **Header section**: Thiết lập h-16 với justify-start và px-4 để căn chỉnh đồng nhất
- **Content sections**: Đồng bộ kích thước với space-y-4 và shadow-sm cho tất cả section
- **Category badges**: Kích thước cố định 110px x 36px với z-index phù hợp
- **Template badge**: Kích thước cố định w-[90px] với truncate để tránh tràn text
- **Hover overlay**: Thêm z-20 để đảm bảo hiển thị đúng thứ tự
- **Nút hành động**: Chiều cao cố định 50px và chiều rộng đồng nhất cho nút Preview

### Template System Fixes
**Date**: December 2024
**Changes**:
- **TemplateClassic.tsx**: Hoàn toàn viết lại để sử dụng CVTemplateBase và TemplateConfig
- **TemplateCreative.tsx**: Cập nhật để align với new structure và cvData getter methods
- **Consistency**: Tất cả 4 templates (Minimal, Modern, Creative, Classic) đều hoạt động nhất quán
- **Error handling**: Cải thiện xử lý lỗi và data validation
- **Responsive design**: Tối ưu hiển thị trên các thiết bị khác nhau

### Architecture Improvements
**Date**: December 2024
**Changes**:
- **CVTemplateProps**: Standardized props interface cho tất cả templates
- **Data flow**: Cải thiện cách templates truy cập và sử dụng CV data
- **Type safety**: Tăng cường TypeScript typing và validation
- **Code reusability**: Tối ưu code sharing giữa các templates

---

**Last Updated**: December 2024
**Version**: 1.1.1
**Maintainer**: CV Builder Team