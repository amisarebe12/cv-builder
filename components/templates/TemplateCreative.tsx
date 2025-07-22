'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Star, Briefcase, GraduationCap, Code, Languages, FileText } from 'lucide-react';

// Cấu hình cho template Creative
const creativeConfig: TemplateConfig = {
  id: 'creative',
  name: 'Creative',
  description: 'Thiết kế sáng tạo với màu sắc nổi bật',
  category: 'Creative',
  colors: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#f3f4f6'
  },
  fonts: {
    heading: 'sans-serif',
    body: 'sans-serif'
  },
  layout: 'two-column'
};

// Template Creative class
class CreativeTemplate extends CVTemplateBase {
  constructor() {
    super(creativeConfig);
  }

  render(props: CVTemplateProps): React.ReactElement {
    const { cvData, className = '', isPreview = false } = props;
    const personalInfo = cvData.getPersonalInfo();
    const experiences = cvData.getExperiences();
    const education = cvData.getEducation();
    const skills = cvData.getSkills();
    const projects = cvData.getProjects();
    const languages = cvData.getLanguages();
    const certifications = cvData.getCertifications();

    return (
      <div className={`max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden ${className}`}>
        {/* Header Section with Creative Design */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-20 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            {personalInfo.avatar && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {personalInfo.fullName}
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-6">
                {personalInfo.title}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary */}
            {cvData.getSummary() && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h2 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <FileText size={20} />
                  Giới thiệu
                </h2>
                <p className="text-gray-700 leading-relaxed">{cvData.getSummary()}</p>
              </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <Code size={20} />
                  Kỹ năng
                </h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${this.getSkillLevelColor(skill.level)}`}
                          style={{ width: this.getSkillLevelWidth(skill.level) }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Languages size={20} />
                  Ngôn ngữ
                </h2>
                <div className="space-y-2">
                  {languages.map((language, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{language.name}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                  <Award size={20} />
                  Chứng chỉ
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-b border-yellow-200 pb-2 last:border-b-0">
                      <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar size={12} />
                          {this.formatDate(cert.date)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {experiences && experiences.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-purple-500 pb-2">
                  <Briefcase size={24} />
                  Kinh nghiệm làm việc
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-8 border-l-2 border-purple-300">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                            <p className="text-purple-600 font-semibold">{exp.company}</p>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-2 sm:mt-0">
                            <Calendar size={14} />
                            {this.formatDateRange(exp.startDate, exp.endDate)}
                          </div>
                        </div>
                        {exp.description && (
                          <ul className="text-gray-700 leading-relaxed space-y-1 list-disc list-inside mb-4">
                            {Array.isArray(exp.description) ? exp.description.map((desc, descIndex) => (
                              <li key={descIndex}>{desc}</li>
                            )) : (
                              <li>{exp.description}</li>
                            )}
                          </ul>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-blue-500 pb-2">
                  <GraduationCap size={24} />
                  Học vấn
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-8 border-l-2 border-blue-300">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{edu.degree} - {edu.field}</h3>
                            <p className="text-blue-600 font-semibold">{edu.institution}</p>
                            {edu.gpa && (
                              <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-2 sm:mt-0">
                            <Calendar size={14} />
                            {this.formatDateRange(edu.startDate, edu.endDate)}
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-green-500 pb-2">
                  <Star size={24} />
                  Dự án
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{project.name}</h3>
                      {project.description && (
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {this.formatDateRange(project.startDate, project.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Get skill level color for progress bars
   */
  protected getSkillLevelColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'expert':
      case 'chuyên gia':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'advanced':
      case 'nâng cao':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'intermediate':
      case 'trung bình':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'beginner':
      case 'cơ bản':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  }

  /**
   * Get skill level width percentage
   */
  protected getSkillLevelWidth(level: string): string {
    switch (level.toLowerCase()) {
      case 'expert':
      case 'chuyên gia':
        return '95%';
      case 'advanced':
      case 'nâng cao':
        return '80%';
      case 'intermediate':
      case 'trung bình':
        return '65%';
      case 'beginner':
      case 'cơ bản':
        return '40%';
      default:
        return '50%';
    }
  }
}

// Tạo instance và export component
const creativeTemplateInstance = new CreativeTemplate();

const TemplateCreativeComponent: React.FC<CVTemplateProps> = (props) => {
  return creativeTemplateInstance.render(props);
};

export default withTemplateBase(TemplateCreativeComponent, creativeTemplateInstance);
export { creativeTemplateInstance };