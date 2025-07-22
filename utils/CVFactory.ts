import React from 'react';
import { CVTemplateProps } from '../components/templates/CVTemplateBase';
import { minimalTemplateInstance } from '../components/templates/TemplateMinimal';
import { modernTemplateInstance } from '../components/templates/TemplateModern';
import { creativeTemplateInstance } from '../components/templates/TemplateCreative';
import { classicTemplateInstance } from '../components/templates/TemplateClassic';
import { techTemplateInstance } from '../components/templates/TemplateTech';
import { businessTemplateInstance } from '../components/templates/TemplateBusiness';
import { medicalTemplateInstance } from '../components/templates/TemplateMedical';
import { educationTemplateInstance } from '../components/templates/TemplateEducation';
import { creative2TemplateInstance } from '../components/templates/TemplateCreative2';
import { legalTemplateInstance } from '../components/templates/TemplateLegal';
import { financeTemplateInstance } from '../components/templates/TemplateFinance';
import { constructionTemplateInstance } from '../components/templates/TemplateConstruction';
import { marketingTemplateInstance } from '../components/templates/TemplateMarketing';
import { hospitalityTemplateInstance } from '../components/templates/TemplateHospitality';
import { retailTemplateInstance } from '../components/templates/TemplateRetail';
import { agricultureTemplateInstance } from '../components/templates/TemplateAgriculture';

// Import dynamic để tối ưu performance
const TemplateMinimal = React.lazy(() => import('../components/templates/TemplateMinimal'));
const TemplateModern = React.lazy(() => import('../components/templates/TemplateModern'));
const TemplateCreative = React.lazy(() => import('../components/templates/TemplateCreative'));
const TemplateClassic = React.lazy(() => import('../components/templates/TemplateClassic'));
const TemplateTech = React.lazy(() => import('../components/templates/TemplateTech'));
const TemplateBusiness = React.lazy(() => import('../components/templates/TemplateBusiness'));
const TemplateMedical = React.lazy(() => import('../components/templates/TemplateMedical'));
const TemplateEducation = React.lazy(() => import('../components/templates/TemplateEducation'));
const TemplateCreative2 = React.lazy(() => import('../components/templates/TemplateCreative2'));
const TemplateLegal = React.lazy(() => import('../components/templates/TemplateLegal'));
const TemplateFinance = React.lazy(() => import('../components/templates/TemplateFinance'));
const TemplateConstruction = React.lazy(() => import('../components/templates/TemplateConstruction'));
const TemplateMarketing = React.lazy(() => import('../components/templates/TemplateMarketing'));
const TemplateHospitality = React.lazy(() => import('../components/templates/TemplateHospitality'));
const TemplateRetail = React.lazy(() => import('../components/templates/TemplateRetail'));
const TemplateAgriculture = React.lazy(() => import('../components/templates/TemplateAgriculture'));

// Interface định nghĩa thông tin template
export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  component: React.ComponentType<CVTemplateProps>;
  instance: any;
}

// CV Factory class sử dụng Factory Pattern
export class CVFactory {
  private static instance: CVFactory;
  private templates: Map<string, TemplateInfo>;

  private constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  // Singleton pattern
  public static getInstance(): CVFactory {
    if (!CVFactory.instance) {
      CVFactory.instance = new CVFactory();
    }
    return CVFactory.instance;
  }

  // Khởi tạo danh sách templates
  private initializeTemplates(): void {
    // Template Minimal
    this.templates.set('minimal', {
      id: 'minimal',
      name: 'Minimal',
      description: 'Thiết kế tối giản, chuyên nghiệp',
      category: 'Professional',
      preview: '/images/template-minimal-preview.jpg',
      component: TemplateMinimal,
      instance: minimalTemplateInstance
    });

    // Template Modern
    this.templates.set('modern', {
      id: 'modern',
      name: 'Modern',
      description: 'Thiết kế hiện đại, bắt mắt',
      category: 'Creative',
      preview: '/images/template-modern-preview.jpg',
      component: TemplateModern,
      instance: modernTemplateInstance
    });

    // Template Creative
    this.templates.set('creative', {
      id: 'creative',
      name: 'Creative',
      description: 'Mẫu CV sáng tạo với thiết kế độc đáo và màu sắc nổi bật',
      category: 'Creative',
      preview: '/images/template-creative-preview.jpg',
      component: TemplateCreative,
      instance: creativeTemplateInstance
    });

    // Template Classic
    this.templates.set('classic', {
      id: 'classic',
      name: 'Classic',
      description: 'Thiết kế cổ điển, thanh lịch',
      category: 'Traditional',
      preview: '/images/template-classic-preview.jpg',
      component: TemplateClassic,
      instance: classicTemplateInstance
    });
    
    // Template Tech
    this.templates.set('tech', {
      id: 'tech',
      name: 'Tech',
      description: 'Thiết kế chuyên nghiệp dành cho ngành IT và công nghệ',
      category: 'IT',
      preview: '/images/template-tech-preview.jpg',
      component: TemplateTech,
      instance: techTemplateInstance
    });
    
    // Template Business
    this.templates.set('business', {
      id: 'business',
      name: 'Business',
      description: 'Thiết kế chuyên nghiệp dành cho ngành kinh doanh',
      category: 'Business',
      preview: '/images/template-business-preview.jpg',
      component: TemplateBusiness,
      instance: businessTemplateInstance
    });
    
    // Template Medical
    this.templates.set('medical', {
      id: 'medical',
      name: 'Medical',
      description: 'Thiết kế chuyên nghiệp dành cho ngành y tế và chăm sóc sức khỏe',
      category: 'Healthcare',
      preview: '/images/template-medical-preview.jpg',
      component: TemplateMedical,
      instance: medicalTemplateInstance
    });
    
    // Template Education
    this.templates.set('education', {
      id: 'education',
      name: 'Education',
      description: 'Thiết kế chuyên nghiệp dành cho ngành giáo dục',
      category: 'Education',
      preview: '/images/template-education-preview.jpg',
      component: TemplateEducation,
      instance: educationTemplateInstance
    });
    
    // Template Creative2
    this.templates.set('creative2', {
      id: 'creative2',
      name: 'Creative Plus',
      description: 'Thiết kế sáng tạo dành cho ngành thiết kế và nghệ thuật',
      category: 'Creative',
      preview: '/images/template-creative2-preview.jpg',
      component: TemplateCreative2,
      instance: creative2TemplateInstance
    });
    
    // Template Legal
    this.templates.set('legal', {
      id: 'legal',
      name: 'Legal',
      description: 'Thiết kế chuyên nghiệp dành cho ngành luật',
      category: 'Legal',
      preview: '/images/template-legal-preview.jpg',
      component: TemplateLegal,
      instance: legalTemplateInstance
    });
    
    // Template Finance
    this.templates.set('finance', {
      id: 'finance',
      name: 'Finance',
      description: 'Thiết kế chuyên nghiệp dành cho ngành tài chính và ngân hàng',
      category: 'Finance',
      preview: '/images/template-finance-preview.jpg',
      component: TemplateFinance,
      instance: financeTemplateInstance
    });
    
    // Template Construction
    this.templates.set('construction', {
      id: 'construction',
      name: 'Construction',
      description: 'Thiết kế chuyên nghiệp dành cho ngành xây dựng và kiến trúc',
      category: 'Construction',
      preview: '/images/template-construction-preview.jpg',
      component: TemplateConstruction,
      instance: constructionTemplateInstance
    });
    
    // Template Marketing
    this.templates.set('marketing', {
      id: 'marketing',
      name: 'Marketing',
      description: 'Thiết kế hiện đại và sáng tạo dành cho ngành marketing và truyền thông',
      category: 'Marketing',
      preview: '/images/template-marketing-preview.jpg',
      component: TemplateMarketing,
      instance: marketingTemplateInstance
    });
    
    // Template Hospitality
    this.templates.set('hospitality', {
      id: 'hospitality',
      name: 'Hospitality',
      description: 'Thiết kế chuyên nghiệp dành cho ngành khách sạn và du lịch',
      category: 'Hospitality',
      preview: '/images/template-hospitality-preview.jpg',
      component: TemplateHospitality,
      instance: hospitalityTemplateInstance
    });
    
    // Template Retail
    this.templates.set('retail', {
      id: 'retail',
      name: 'Retail',
      description: 'Thiết kế chuyên nghiệp dành cho ngành bán lẻ và thương mại',
      category: 'Retail',
      preview: '/images/template-retail-preview.jpg',
      component: TemplateRetail,
      instance: retailTemplateInstance
    });
    
    // Template Agriculture
    this.templates.set('agriculture', {
      id: 'agriculture',
      name: 'Agriculture',
      description: 'Thiết kế chuyên nghiệp dành cho ngành nông nghiệp và môi trường',
      category: 'Agriculture',
      preview: '/images/template-agriculture-preview.jpg',
      component: TemplateAgriculture,
      instance: agricultureTemplateInstance
    });
  }

  // Lấy component template theo ID
  public getTemplate(templateId: string): React.ComponentType<CVTemplateProps> | null {
    const template = this.templates.get(templateId);
    // Trả về component với key để đảm bảo React re-render khi template thay đổi
    return template ? template.component : null;
  }

  // Lấy thông tin template theo ID
  public getTemplateInfo(templateId: string): TemplateInfo | null {
    return this.templates.get(templateId) || null;
  }

  // Lấy tất cả templates
  public getAllTemplates(): TemplateInfo[] {
    return Array.from(this.templates.values());
  }

  // Lấy templates theo category
  public getTemplatesByCategory(category: string): TemplateInfo[] {
    return Array.from(this.templates.values())
      .filter(template => template.category === category);
  }

  // Kiểm tra template có tồn tại không
  public hasTemplate(templateId: string): boolean {
    return this.templates.has(templateId);
  }

  // Đăng ký template mới (để mở rộng)
  public registerTemplate(templateInfo: TemplateInfo): void {
    if (this.templates.has(templateInfo.id)) {
      console.warn(`Template với ID '${templateInfo.id}' đã tồn tại. Đang ghi đè...`);
    }
    this.templates.set(templateInfo.id, templateInfo);
  }

  // Hủy đăng ký template
  public unregisterTemplate(templateId: string): boolean {
    return this.templates.delete(templateId);
  }

  // Lấy danh sách categories
  public getCategories(): string[] {
    const categories = new Set<string>();
    this.templates.forEach(template => {
      categories.add(template.category);
    });
    return Array.from(categories);
  }

  // Tìm kiếm templates
  public searchTemplates(query: string): TemplateInfo[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.templates.values())
      .filter(template => 
        template.name.toLowerCase().includes(searchTerm) ||
        template.description.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm)
      );
  }

  // Lấy template mặc định
  public getDefaultTemplate(): TemplateInfo {
    return this.getTemplateInfo('minimal') || Array.from(this.templates.values())[0];
  }

  // Validate template
  public validateTemplate(templateInfo: TemplateInfo): boolean {
    return !!(templateInfo.id && 
             templateInfo.name && 
             templateInfo.component && 
             templateInfo.category);
  }

  // Export template list cho static usage
  public getTemplateList(): { id: string; name: string; description: string; category: string }[] {
    return Array.from(this.templates.values()).map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category
    }));
  }
}

// Helper functions
export const getTemplateComponent = (templateId: string): React.ComponentType<CVTemplateProps> | null => {
  return CVFactory.getInstance().getTemplate(templateId);
};

export const getAllTemplates = (): TemplateInfo[] => {
  return CVFactory.getInstance().getAllTemplates();
};

export const getTemplateInfo = (templateId: string): TemplateInfo | null => {
  return CVFactory.getInstance().getTemplateInfo(templateId);
};

export const hasTemplate = (templateId: string): boolean => {
  return CVFactory.getInstance().hasTemplate(templateId);
};

// Export default instance
export default CVFactory.getInstance();