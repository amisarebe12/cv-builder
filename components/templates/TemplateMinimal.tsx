'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';

// Cấu hình cho template Minimal
const minimalConfig: TemplateConfig = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Thiết kế tối giản, chuyên nghiệp',
  category: 'Professional',
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
};

// Template Minimal class
class MinimalTemplate extends CVTemplateBase {
  constructor() {
    super(minimalConfig);
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
      <div className={`bg-white shadow-lg ${className}`}>
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-8">
          <div className="flex items-start gap-6">
            {personalInfo.avatar && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
              <h2 className="text-xl text-blue-100 mb-4">{personalInfo.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <span>GitHub</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Summary Section */}
          {cvData.getSummary() && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Tóm tắt
              </h3>
              <p className="text-gray-600 leading-relaxed">{cvData.getSummary()}</p>
            </section>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Kinh nghiệm làm việc
              </h3>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{exp.position}</h4>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {this.formatDateRange(exp.startDate, exp.endDate)}
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
                      {exp.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Học vấn
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{edu.degree} - {edu.field}</h4>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {this.formatDateRange(edu.startDate, edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Kỹ năng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Technical', 'Soft', 'Language'].map((category) => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-700 mb-3">
                        {category === 'Technical' ? 'Kỹ năng kỹ thuật' : 
                         category === 'Soft' ? 'Kỹ năng mềm' : 'Ngôn ngữ'}
                      </h4>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-700">{skill.name}</span>
                              <span className="text-gray-500">{skill.level}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: this.getSkillLevelWidth(skill.level) }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Dự án
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      {this.formatDateRange(project.startDate, project.endDate || 'Present')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Ngôn ngữ
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-gray-500 text-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Chứng chỉ
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-800">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">{this.formatDate(cert.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Tạo instance và export component
const minimalTemplateInstance = new MinimalTemplate();

const TemplateMinimalComponent: React.FC<CVTemplateProps> = (props) => {
  return minimalTemplateInstance.render(props);
};

export default withTemplateBase(TemplateMinimalComponent, minimalTemplateInstance);
export { minimalTemplateInstance };