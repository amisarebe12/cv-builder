// Định nghĩa các interface và class cho CV Model

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Other';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages?: { name: string; level: string }[];
  certifications?: { name: string; issuer: string; date: string }[];
  lastModified?: string; // Thời gian cập nhật cuối cùng
  templateId?: string; // Mẫu CV được chọn
}

// CV Model class với các phương thức tiện ích
export class CVModel {
  private data: CVData;

  constructor(data: CVData) {
    this.data = data;
  }

  // Getter methods
  getId(): string {
    return this.data.id;
  }

  getPersonalInfo(): PersonalInfo {
    return this.data.personalInfo;
  }

  getSummary(): string {
    return this.data.summary;
  }

  getExperiences(): Experience[] {
    return this.data.experiences;
  }

  getEducation(): Education[] {
    return this.data.education;
  }

  getSkills(): Skill[] {
    return this.data.skills;
  }

  getProjects(): Project[] {
    return this.data.projects;
  }

  getLanguages(): { name: string; level: string }[] {
    return this.data.languages || [];
  }

  getCertifications(): { name: string; issuer: string; date: string }[] {
    return this.data.certifications || [];
  }

  // Utility methods
  getSkillsByCategory(category: string): Skill[] {
    return this.data.skills.filter(skill => skill.category === category);
  }

  getTotalExperienceYears(): number {
    const experiences = this.data.experiences;
    if (experiences.length === 0) return 0;

    let totalMonths = 0;
    experiences.forEach(exp => {
      const start = new Date(exp.startDate);
      const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += months;
    });

    return Math.round(totalMonths / 12 * 10) / 10;
  }

  // Validation methods
  isValid(): boolean {
    return !!(this.data.personalInfo.fullName && 
             this.data.personalInfo.email && 
             this.data.personalInfo.phone);
  }

  // Export methods
  toJSON(): CVData {
    return { ...this.data };
  }

  // Static factory method
  static fromJSON(json: CVData): CVModel {
    return new CVModel(json);
  }
}