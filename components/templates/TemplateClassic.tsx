'use client';

import React from 'react';
import { CVTemplateBase, CVTemplateProps, TemplateConfig, withTemplateBase } from './CVTemplateBase';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';

// Cấu hình cho template Classic
const classicConfig: TemplateConfig = {
  id: 'classic',
  name: 'Classic',
  description: 'Thiết kế cổ điển, thanh lịch',
  category: 'Professional',
  colors: {
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#f9fafb'
  },
  fonts: {
    heading: 'serif',
    body: 'sans-serif'
  },
  layout: 'single-column'
};

// Template Classic class
class ClassicTemplate extends CVTemplateBase {
  constructor() {
    super(classicConfig);
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
      <div className={`max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-3 font-serif">
                {personalInfo.fullName}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 mb-6 font-serif italic">
                {personalInfo.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.address}</span>
                </div>
                {personalInfo.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Summary Section */}
          {cvData.getSummary() && (
            <section className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">📝</span>
                Tóm tắt
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {cvData.getSummary()}
              </p>
            </section>
          )}

          {/* Experience Section */}
          {experiences && experiences.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">💼</span>
                Kinh nghiệm làm việc
              </h3>
              <div className="space-y-6 relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                      💼
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-1">
                            {exp.position}
                          </h4>
                          <p className="text-lg text-gray-600 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {this.formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4 leading-relaxed">
                          {Array.isArray(exp.description) ? exp.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                          )) : (
                            <li>{exp.description}</li>
                          )}
                        </ul>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">🎓</span>
                Học vấn
              </h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {edu.degree} - {edu.field}
                        </h4>
                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {this.formatDateRange(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">⚡</span>
                Kỹ năng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Technical', 'Soft', 'Language'].map((category) => {
                  const categorySkills = skills.filter(
                    (skill) => skill.category === category
                  );
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        {category === 'Technical' && '🔧 Kỹ năng kỹ thuật'}
                        {category === 'Soft' && '🤝 Kỹ năng mềm'}
                        {category === 'Language' && '🌐 Ngôn ngữ'}
                      </h4>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.id} className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">{skill.name}</span>
                            <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
                              {skill.level}
                            </span>
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
          {projects && projects.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">🚀</span>
                Dự án
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {project.name}
                    </h4>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {this.formatDateRange(project.startDate, project.endDate || 'Present')}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">🌍</span>
                Ngôn ngữ
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-gray-700 font-medium">{lang.name}</span>
                      <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif flex items-center">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm mr-3">🏆</span>
                Chứng chỉ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">{cert.name}</h4>
                    <p className="text-gray-600 text-sm font-medium mb-1">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {this.formatDate(cert.date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
}

// Tạo instance và export component
const classicTemplateInstance = new ClassicTemplate();

const TemplateClassicComponent: React.FC<CVTemplateProps> = (props) => {
  return classicTemplateInstance.render(props);
};

export default withTemplateBase(TemplateClassicComponent, classicTemplateInstance);
export { classicTemplateInstance };