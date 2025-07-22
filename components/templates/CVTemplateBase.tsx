import React from 'react';
import { CVModel } from '../../models/CVModel';

// Interface định nghĩa props chung cho tất cả CV templates
export interface CVTemplateProps {
  cvData: CVModel;
  className?: string;
  isPreview?: boolean;
}

// Interface định nghĩa cấu hình template
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: string;
}

// Abstract base class cho tất cả CV templates
export abstract class CVTemplateBase {
  protected config: TemplateConfig;

  constructor(config: TemplateConfig) {
    this.config = config;
  }

  // Getter methods
  getId(): string {
    return this.config.id;
  }

  getName(): string {
    return this.config.name;
  }

  getDescription(): string {
    return this.config.description;
  }

  getCategory(): string {
    return this.config.category;
  }

  getConfig(): TemplateConfig {
    return { ...this.config };
  }

  // Abstract method - phải được implement bởi các subclass
  abstract render(props: CVTemplateProps): React.ReactElement;

  // Utility methods có thể được override
  protected formatDate(dateString: string): string {
    if (dateString === 'Present') return 'Hiện tại';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  protected formatDateRange(startDate: string, endDate: string): string {
    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  }

  protected getSkillLevelColor(level: string): string {
    switch (level) {
      case 'Expert':
        return '#10b981'; // green-500
      case 'Advanced':
        return '#3b82f6'; // blue-500
      case 'Intermediate':
        return '#f59e0b'; // amber-500
      case 'Beginner':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  }

  protected getSkillLevelWidth(level: string): string {
    switch (level) {
      case 'Expert':
        return '100%';
      case 'Advanced':
        return '80%';
      case 'Intermediate':
        return '60%';
      case 'Beginner':
        return '40%';
      default:
        return '20%';
    }
  }

  // Validation methods
  protected validateCVData(cvData: CVModel): boolean {
    return cvData.isValid();
  }

  // Common styling utilities
  protected getCommonStyles() {
    return {
      container: {
        fontFamily: this.config.fonts.body,
        color: this.config.colors.secondary,
        lineHeight: '1.6'
      },
      heading: {
        fontFamily: this.config.fonts.heading,
        color: this.config.colors.primary,
        fontWeight: 'bold'
      },
      section: {
        marginBottom: '1.5rem'
      },
      sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: this.config.colors.primary,
        marginBottom: '0.75rem',
        borderBottom: `2px solid ${this.config.colors.accent}`,
        paddingBottom: '0.25rem'
      }
    };
  }

  // Export utilities
  protected generatePrintStyles(): string {
    return `
      @media print {
        .cv-template {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        .page-break {
          page-break-before: always;
        }
      }
    `;
  }
}

// HOC để wrap template components
export function withTemplateBase<T extends CVTemplateProps>(
  TemplateComponent: React.ComponentType<T>,
  templateInstance: CVTemplateBase
) {
  return function WrappedTemplate(props: T) {
    // Validate CV data
    if (!templateInstance.validateCVData(props.cvData)) {
      return (
        <div className="p-8 text-center text-red-500">
          <h3 className="text-lg font-semibold mb-2">Dữ liệu CV không hợp lệ</h3>
          <p>Vui lòng kiểm tra lại thông tin cá nhân cơ bản.</p>
        </div>
      );
    }

    return (
      <div className="cv-template">
        <style dangerouslySetInnerHTML={{ __html: templateInstance.generatePrintStyles() }} />
        <TemplateComponent {...props} />
      </div>
    );
  };
}

// Type guard để kiểm tra template instance
export function isValidTemplate(template: any): template is CVTemplateBase {
  return template instanceof CVTemplateBase &&
         typeof template.render === 'function' &&
         typeof template.getId === 'function';
}